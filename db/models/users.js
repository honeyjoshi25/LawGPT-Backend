"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  { freezeTableName: true, paranoid: true, modelName: "User" }
);

User.associate = (models) => {
  User.hasMany(models.LoginAttempt, { foreignKey: "user_id" });
  User.hasMany(models.Session, { foreignKey: "user_id" });
  User.hasMany(models.ChatHistory, { foreignKey: "user_id" });
  User.hasMany(models.Payment, { foreignKey: "user_id" });
  User.hasMany(models.UserSubscription, { foreignKey: "user_id" });
};

module.exports = { User };
