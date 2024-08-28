"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Payment = sequelize.define(
  "Payment",
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
    discount_id: {
      type: DataTypes.UUID,
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    payment_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    success: {
      type: DataTypes.BOOLEAN,
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
  { freezeTableName: true, paranoid: true, modelName: "Payment" }
);

Payment.associate = (models) => {
  Payment.belongsTo(models.User, { foreignKey: "user_id" });
  Payment.belongsTo(models.Discount, { foreignKey: "discount_id" });
  Payment.hasMany(models.UserSubscription, { foreignKey: "payment_id" });
};

module.exports = { Payment };
