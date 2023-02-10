const Router = require('koa-router')
const router = new Router()

const jwt = require('koa-jwt')
const { sign } = require('jsonwebtoken');

const secret = 'xChat'

router.use(jwt({ secret }).unless({
    path: [
        '/users/login'
    ]
}))

router.get('/', async (ctx, next) => {
    ctx.body = {
        data: 'Developing',
        code: 200
    }
})

router.post('/login', async (ctx, next) => {
    ctx.verifyParams({
        email: { type: 'email', required: true },
        password: { type: 'string', required: true }
    });

    const params = ctx.request.body
    const { email, password } = params

    // TODO
    if (email != 'xChat@qq.com' && password != 'xChat') {
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