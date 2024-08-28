"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");
const Discount = sequelize.define(
  "Discount",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      unique: true,
    },
    subsccription_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    discount_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coupon_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
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
  { freezeTableName: true, paranoid: true, modelName: "Discount" }
);

Discount.associate = (models) => {
  Discount.belongsTo(models.Subscription, { foreignKey: "subscription_id" });
  Discount.hasMany(models.Payment, { foreignKey: "discount_id" });
};

module.exports = { Discount };
