const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./db')

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User'
});

module.exports = { User }