"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("LoginAttempt", {
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
      attempt_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      success: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      ip_address: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("LoginAttempt");
  },
};
