const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // 1 attempt per IP
  message: {
    status: 429,
    message: "Too many login attempts. Please try again after 5 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
