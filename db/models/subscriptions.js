"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Subscription = sequelize.define(
  "Subscription",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
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
  { freezeTableName: true, paranoid: true, modelName: "Subscription" }
);

Subscription.associate = (models) => {
  Subscription.hasMany(models.UserSubscription, {
    foreignKey: "subscription_id",
  });
  Subscription.hasMany(models.Discount, { foreignKey: "subscription_id" });
};

module.exports = { Subscription };
