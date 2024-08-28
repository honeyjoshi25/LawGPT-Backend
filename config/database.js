const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, 
      },
    },
  }
);

async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

dbConnect();

module.exports = { sequelize };
