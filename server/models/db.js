const { Sequelize } = require('sequelize');
const path = require('path')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/../xchat.db'
});

module.exports = { sequelize }