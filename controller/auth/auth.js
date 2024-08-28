const { User } = require("../../db/models/users");
const { OTP } = require("../../db/models/otp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../../utils/email");

const signUp = async (req, res, next) => {
  try {
    const { username, email, password, country, profession } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: 400, message: "Email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      country,
      profession,
    });

    const result = newUser.toJSON();

    delete result.password;
    delete result.deletedAt;

    if (!newUser) {
      return res
        .status(400)
        .json({ status: 400, message: "Failed to create account!" });
    }

    return res.status(201).json({
      status: 201,
      message: "Your account has been created successfully.",
      result,
    });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error!",
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const result = user.toJSON();

    delete result.password;
    delete result.deletedAt;

    let token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1w",
    });

    return res.status(200).json({
      status: 200,
      message: "Loggedin successfully.",
      user: result,
      token,
    });
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error!",
    });
  }
};

const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ status: 400, message: "User not found!" });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

    await OTP.create({ email, otp, expiresAt });

    const emailSubject = "Password Reset OTP";

    const emailMessage = `Dear ${
      user.username
    },\n\nYou have requested to reset your password. Please use the following One-Time Password (OTP) to reset your password:\n\n${otp}\n\nThis OTP is valid for the next 15 minutes and will expire at ${expiresAt.toLocaleTimeString()}.\nIf you did not request this, please ignore this email. Do not share this OTP with anyone.\n\nBest regards,\nTeam Wkeel.`;

    sendEmail(email, emailSubject, emailMessage);
    return res
      .status(200)
      .json({ status: 200, message: "An OTP has been sent to your email." });
  } catch (error) {
    console.error("Error in otp send:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error!",
    });
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await OTP.findOne({ where: { email, otp } });
    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid or expired OTP!" });
    }

    return res
      .status(200)
      .json({ status: 200, message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error in otp verify:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error!",
    });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    const otpRecord = await OTP.findOne({ where: { email, otp } });
    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP!" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update({ password: hashedPassword }, { where: { email } });

    // Delete OTP record
    await OTP.destroy({ where: { email, otp } });

    return res.status(200).json({
      status: 200,
      message: "Your password has been reset successfully.",
    });
  } catch (error) {
    console.error("Error in password reset:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error!",
    });
  }
};

module.exports = { signUp, login, sendOTP, verifyOTP, resetPassword };
