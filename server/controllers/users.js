const Router = require('koa-router')
const router = new Router()

router.get('/', async (ctx, next) => {
    ctx.body = {
        data: ctx.state.user,
        code: 200
    }
})

module.exports = router