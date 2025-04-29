const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Groups = sequelize.define('Groups', {
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
    tableName: 'groups',
    timestamps: false
});

module.exports = Groups;
