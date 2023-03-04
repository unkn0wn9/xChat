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
// Custom err page
app.use(function (ctx, next) {
    return next().catch((err) => {
        let msg = ''
        switch (err.status) {
            case 401:
                msg = '请先完成认证'
                break
            case 403:
                msg = '您无权进行此操作'
                break
            case 418:
                msg = '接口请求格式错误'
                break
            default:
                throw err
                break
        }
        ctx.status = err.status;
        ctx.body = {
            code: err.status,
            data: {
                msg: msg
            }
        };
    });
});

app.use(jwt({ secret, debug: true }).unless({
    path: [
        '/token',
        '/users'
    ]
}))


// 引入控制器
const token = require('./controllers/token')
const users = require('./controllers/users')
const messages = require('./controllers/messages')
const cards = require('./controllers/cards')

// 引入主路由
router.use('/token', token.routes())
router.use('/users', users.routes())
router.use('/messages', messages.routes())
router.use('/cards', cards.routes())

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