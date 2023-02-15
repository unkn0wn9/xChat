const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./db')
const default_token_limit = require('../utils/config').default_token_limit

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token_usage: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    token_limit: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: default_token_limit
    }
}, {
    sequelize,
    modelName: 'User'
});

module.exports = { User }