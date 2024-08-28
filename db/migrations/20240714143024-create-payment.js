"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payment", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        unique: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      discount_id: {
        type: Sequelize.UUID,
      },
      transaction_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      payment_Date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      payment_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      success: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Payment");
  },
};
