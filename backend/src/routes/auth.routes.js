const express = require('express');

const router = express.Router();
// TODO (security): re-enable these middleware functions when rate limiting is ready.
// const { loginLimiter, signupLimiter, verifyOtpLimiter } = require("../rateLimiters")
const { login, signup, verifyOtp } = require('../controllers/auth.controller');



router.post('/login', login)

router.post('/signup', signup);

router.post('/verify-otp', verifyOtp);

module.exports = router;
