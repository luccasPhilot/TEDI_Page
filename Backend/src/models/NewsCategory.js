const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const NewsCategory = sequelize.define('NewsCategory', {
    id: {
        type: DataTypes.STRING(8),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    removed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'news_categories',
    timestamps: false
});

module.exports = NewsCategory;
