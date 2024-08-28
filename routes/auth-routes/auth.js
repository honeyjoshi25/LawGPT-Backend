const { Router } = require("express");
const router = Router();
const authController = require("../../controller/auth/auth");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/send-otp", authController.sendOTP);
router.post("/verify-otp", authController.verifyOTP);
router.put("/reset-password", authController.resetPassword);

module.exports = router;
