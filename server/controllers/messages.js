const Router = require('koa-router')
const router = new Router()

const callCompletions = require('../utils/openai')
const { User } = require('../models/user')

router.post('/', async (ctx, next) => {
    try {
        ctx.verifyParams({
            msg: { type: 'string', required: true },
        });
    } catch (err) {
        ctx.throw(413)
    }
    const params = ctx.request.body
    const msg = params.msg
    try {
        if (ctx.state.user == null) {
            ctx.throw(413)
        }
        const user_db = await User.findOne({
            where: {
                email: ctx.state.user.email
            }
        })
        if (user_db == null) {
            ctx.throw(401)
        }
        const token_usage = user_db.token_usage
        const token_limit = user_db.token_limit

        let ret_text = ''
        if (token_limit != 0 && token_usage > token_limit) {
            ret_text = '您的Token使用超额,请联系管理员'
        } else {
            ret = await callCompletions(msg) //ret.ret_text ret.usage
            ret_text = ret.ret_text
            //更新用户Token Usage
            await User.update({ token_usage: token_usage + ret.usage }, {
                where: {
                    email: ctx.state.user.email
                }
            });
            await User.sync({ alter: true })
        }

        ctx.body = {
            code: 200,
            data: { msg: ret_text }
        }
    } catch (err) {
        ctx.throw(err)
    }
})

module.exports = router