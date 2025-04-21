const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Token = sequelize.define('Token', {
    id: {
        type: DataTypes.STRING(8),
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    expired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    expiry_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'tokens',
    timestamps: false
});

Token.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Token, { foreignKey: 'user_id' });

module.exports = Token;
