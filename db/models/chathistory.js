"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const ChatHistory = sequelize.define(
  "ChatHistory",
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
    session_id: {
      type: DataTypes.UUID,
    },
    conversation_history: {
      type: DataTypes.JSONB,
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
  { freezeTableName: true, paranoid: true, modelName: "ChatHistory" }
);

ChatHistory.associate = (models) => {
  ChatHistory.belongsTo(models.User, { foreignKey: "user_id" });
  ChatHistory.belongsTo(models.Session, { foreignKey: "session_id" });
};

module.exports = { ChatHistory };
