const express = require("express");
const router = express.Router();
const { forgotPassword, resetPassword } = require("../controllers/authController");
const rateLimiter = require("../middleware/rateLimiter");

// Apply to sensitive routes
router.post("/forgot-password", rateLimiter, forgotPassword);
router.post("/reset-password", rateLimiter, resetPassword);
router.post("/login", rateLimiter, yourLoginController);

module.exports = router;
