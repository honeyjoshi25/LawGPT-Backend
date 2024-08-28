"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const TemplateRegister = sequelize.define(
  "TemplateRegister",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      unique: true,
    },
    cat_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cat_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_path: {
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
  { freezeTableName: true, paranoid: true, modelName: "TemplateRegister" }
);

module.exports = { TemplateRegister };
