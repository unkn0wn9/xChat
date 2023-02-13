const Router = require('koa-router')
const router = new Router()
const { sign } = require('jsonwebtoken');

const secret = require('../utils/config').secret
const crypto = require('crypto')

const { User } = require('../models/user')

router.post('/', async (ctx, next) => {
    ctx.verifyParams({
        email: { type: 'email', required: true },
        password: { type: 'string', required: true }
    });

    const params = ctx.request.body
    const { email, password } = params

    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user != null) {
            //存在该用户,进行密码验证
            const password_crypt = crypto.createHash('sha1').update(password).digest('hex')
            if (password_crypt == user.password) {
                //登录成功
                const token = sign({ email: email }, secret, { expiresIn: '1d' })
                ctx.body = {
                    data: {
                        'msg': '登录成功',
                        'email': email,
                        'token': token
                    },
                    code: 200
                }
            } else {
                // 密码错误,登录失败
                throw (403)
            }
        } else {
            throw (403)
        }
    } catch (err) {
        if (err == 403) {
            ctx.body = {
                code: 403,
                data: '用户名密码错误'
            }
        }
    }
})

module.exports = router