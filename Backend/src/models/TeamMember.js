const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Groups = require("./Groups");

const TeamMember = sequelize.define(
  "TeamMember",
  {
    id: {
      type: DataTypes.STRING(8),
      primaryKey: true,
      allowNull: false,
    },
    group_id: {
      type: DataTypes.STRING(8),
      allowNull: true,
      references: {
        model: "groups",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    ra: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    linkedin_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    role_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    removed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "team_members",
    timestamps: false,
  }
);

TeamMember.belongsTo(Groups, { foreignKey: "group_id", onDelete: "CASCADE" });
Groups.hasMany(TeamMember, { foreignKey: "group_id", onDelete: "CASCADE" });

module.exports = TeamMember;
