"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const LoginAttempt = sequelize.define(
  "LoginAttempt",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      unique: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    attempt_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    success: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    ip_address: {
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
  { freezeTableName: true, paranoid: true, modelName: "LoginAttempt" }
);

LoginAttempt.associate = (models) => {
  LoginAttempt.belongsTo(models.User, { foreignKey: "user_id" });
};

module.exports = { LoginAttempt };
