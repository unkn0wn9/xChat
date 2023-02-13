const Router = require('koa-router')
const router = new Router()

const crypto = require('crypto')
const { User } = require('../models/user')

router.get('/', async (ctx, next) => {
    ctx.body = {
        data: ctx.state.user,
        code: 200
    }
})

router.post('/', async (ctx, next) => {
    ctx.verifyParams({
        email: { type: 'email', required: true },
        password: { type: 'string', required: true }
    });
    const params = ctx.request.body
    const { email, password } = params

    try {
        const user_db = await User.findOne({
            where: {
                email: email
            }
        })
        if (user_db != null) {
            throw (403)
        }
        const user = await User.create({
            email: email,
            password: crypto.createHash('sha1').update(password).digest('hex')
        })
        await User.sync({ alter: true })
        ctx.body = {
            code: 200,
            data: { msg: '注册成功', email: user.email }
        }
    } catch (err) {
        if (err == 403) {
            ctx.body = {
                code: 403,
                data: '用户已存在'
            }
        }
    }
})

module.exports = router