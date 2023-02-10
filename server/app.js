const Koa = require('koa')
const cors = require('koa2-cors')
const app = new Koa()

const Router = require('koa-router')
const router = new Router()

app.use(cors())

// 引入控制器
const users = require('./controllers/users')

// 引入主路由
router.use('/users', users.routes())

app.use(router.routes())

// 允许Post
app.use(router.allowedMethods())

app.use(async (ctx) => {
    ctx.body = 'xChat Server Status: OK!'
})

app.listen(3001, () => {
    console.log('localhost:3001')
})