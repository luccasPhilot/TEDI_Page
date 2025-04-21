const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TeamMember = sequelize.define('TeamMember', {
    id: {
        type: DataTypes.STRING(8),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    ra: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    linkedin_url: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    role_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'team_members',
    timestamps: false
});

module.exports = TeamMember;
