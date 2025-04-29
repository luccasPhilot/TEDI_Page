const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Monitor = sequelize.define('Monitor', {
    id: {
        type: DataTypes.STRING(8),
        primaryKey: true,
        allowNull: false
    },
    group_id: {
        type: DataTypes.STRING(8),
        allowNull: true,
        references: {
            model: 'groups',
            key: 'id',
        },
        onDelete: 'CASCADE'
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(320),
        allowNull: false,
        unique: true
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true
    },
    ra: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true
    },
    subject: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    period: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 10
        }
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
    tableName: 'monitors',
    timestamps: false
});

module.exports = Monitor;
