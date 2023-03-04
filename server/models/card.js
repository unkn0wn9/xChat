const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./db')

class Card extends Model { }

Card.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'unused' // unused used
    },
}, {
    sequelize,
    modelName: 'Card'
});

module.exports = { Card }