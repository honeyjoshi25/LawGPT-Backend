"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const OTP = sequelize.define(
  "OTP",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
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
  { freezeTableName: true, paranoid: true, modelName: "OTP" }
);

module.exports = { OTP };
