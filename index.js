const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth-routes/auth");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "20mb" }));
app.use(cors());

app.use(function (req, res, next) {
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  next();
});

app.get("/", (req, res) => {
  res.send("App Running Successfully..");
});

app.use("/auth", authRoutes);

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "Route not found!",
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
