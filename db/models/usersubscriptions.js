"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const UserSubscription = sequelize.define(
  "UserSubscription",
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
    subscription_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    payment_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    start_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    end_date: {
      allowNull: false,
      type: DataTypes.DATE,
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
  { freezeTableName: true, paranoid: true, modelName: "UserSubscription" }
);

UserSubscription.associate = (models) => {
  UserSubscription.belongsTo(models.User, { foreignKey: "user_id" });
  UserSubscription.belongsTo(models.Subscription, {
    foreignKey: "subscription_id",
  });
  UserSubscription.belongsTo(models.Payment, { foreignKey: "payment_id" });
};

module.exports = { UserSubscription };
