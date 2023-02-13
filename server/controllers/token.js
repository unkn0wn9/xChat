const Router = require('koa-router')
const router = new Router()
const { sign } = require('jsonwebtoken');

const secret = require('../utils/config').secret

router.post('/', async (ctx, next) => {
    ctx.verifyParams({
        email: { type: 'email', required: true },
        password: { type: 'string', required: true }
    });

    const params = ctx.request.body
    const { email, password } = params

    // TODO
    if (email != 'xChat@qq.com' || password != 'xChat') {
        ctx.throw(403, '用户名密码错误')
    }
    const token = sign({ email: email }, secret, { expiresIn: '1d' })
    ctx.body = {
        data: {
            'token': token
        },
        code: 200
    }
})

module.exports = router