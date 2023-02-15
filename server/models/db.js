const { Sequelize } = require('sequelize');
const path = require('path')
const db_config = require('../utils/config').db_config

const sequelize = new Sequelize(db_config.database, db_config.username, db_config.password, {
    host: db_config.host,
    port: db_config.port,
    dialect: db_config.dialect,
    storage: __dirname + '/../xchat.db'
});


module.exports = { sequelize }