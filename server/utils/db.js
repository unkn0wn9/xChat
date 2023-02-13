const { program } = require('commander');
const { User } = require('../models/user')

function init() {
    console.log('初始化数据库...')
    User.sync({ force: true })
}

program
    .command('init')
    .action(function () {
        init();
    });

program.parse();