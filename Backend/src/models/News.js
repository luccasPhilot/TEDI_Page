const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const NewsCategory = require("./NewsCategory");

const News = sequelize.define(
  "News",
  {
    id: {
      type: DataTypes.STRING(8),
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.STRING(8),
      allowNull: false,
      references: {
        model: "news_categories",
        key: "id",
      },
    },
    draft: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    tableName: "news",
    timestamps: false,
  }
);

News.belongsTo(NewsCategory, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});
NewsCategory.hasMany(News, { foreignKey: "category_id" });

module.exports = News;
