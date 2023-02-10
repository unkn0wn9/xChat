const Router = require('koa-router')
const router = new Router()
const koaBody = require('koa-body')

router.get('/', async (ctx, next) => {
    ctx.body = {
        data: 'Developing',
        code: 200
    }
})

module.exports = router