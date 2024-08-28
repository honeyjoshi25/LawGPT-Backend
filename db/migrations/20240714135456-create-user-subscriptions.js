"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserSubscription", {
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
      subscription_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      payment_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("UserSubscription");
  },
};
