const { program } = require('commander');
const crypto = require('crypto');
const { User } = require('../models/user')
const { Card } = require('../models/card')

function init() {
    console.log('初始化数据库...')
    User.sync({ force: true })
    Card.sync({ force: true })

}

function generatecards() {
    for (let i = 1; i < 100; i++) {
        key = crypto.randomBytes(Math.ceil(48 / 2)).toString('hex').slice(0, 48);
        Card.create({
            key: key,
            value: 2000
        })
        console.log(key)
    }
    Card.sync({ alter: true })
}

program
    .command('init')
    .action(function () {
        init();
    });

program
    .command('generatecards')
    .action(function () {
        generatecards();
    });

program.parse();