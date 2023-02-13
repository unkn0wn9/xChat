const Router = require('koa-router')
const router = new Router()

const callCompletions = require('../utils/openai')


router.post('/', async (ctx, next) => {
    ctx.verifyParams({
        msg: { type: 'string', required: true },
    });
    const params = ctx.request.body
    const msg = params.msg
    try {
        if (ctx.state.user == null) {
            throw (413)
        }
        const ret_text  = await callCompletions(msg)
        ctx.body = {
            code: 200,
            data: { msg: ret_text }
        }
    } catch (err) {
        console.log(err)
        if (err == 413) {
            ctx.body = {
                code: 413,
                data: '请先登录'
            }
        }
    }
})

module.exports = router