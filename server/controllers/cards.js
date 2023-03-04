const Router = require('koa-router')
const router = new Router()

const crypto = require('crypto')
const { Card } = require('../models/card')
const { User } = require('../models/user')

//充值
router.post('/', async (ctx, next) => {
    try {
        ctx.verifyParams({
            key: { type: 'string', required: true }
        });
    } catch (err) {
        ctx.throw(418)
    }
    try {
        const card_key = ctx.request.body.key
        const user_email = ctx.state.user.email
        const user = await User.findOne({
            where: {
                email: user_email
            }
        })
        const user_id = user.id
        const card = await Card.findOne({
            where: {
                key: card_key
            }
        })
        console.log(card_key)
        if (!card || card.status != 'unused') {
            ctx.throw(403)
        }
        //更新token
        await User.update({ token_limit: user.token_limit + card.value }, {
            where: {
                email: user_email
            }
        })
        await User.sync({ alter: true })

        //更新卡密使用状态
        await Card.update({ status: 'used' }, {
            where: {
                key: card_key
            }
        })
        await Card.sync({ alter: true })

        ctx.body = {
            code: 200,
            data: { msg: '充值成功' }
        }
    } catch (err) {
        ctx.throw(err)
    }

})

module.exports = router