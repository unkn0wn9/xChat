const Koa = require('koa')
const cors = require('koa2-cors')
const app = new Koa()

const Router = require('koa-router')
const router = new Router()

const parameter = require('koa-parameter');
const { koaBody } = require('koa-body');

app.use(koaBody())
app.use(cors())

// 认证机制
const jwt = require('koa-jwt')
const { secret } = require('./utils/config')
app.use(jwt({ secret, debug: true }).unless({
    path: [
        '/token',
        '/users'
    ]
}))

// 引入控制器
const token = require('./controllers/token')
const users = require('./controllers/users')

// 引入主路由
router.use('/token', token.routes())
router.use('/users', users.routes())

app.use(router.routes())

// 允许Post
app.use(router.allowedMethods())

parameter(app)

app.use(async (ctx) => {
    ctx.body = 'xChat Server Status: OK!'
})

// Debug
// app.on('error', (err, ctx) => {
//     console.error('Ooops..\n', err);
// });

app.listen(3001, () => {
    console.log('localhost:3001')
})