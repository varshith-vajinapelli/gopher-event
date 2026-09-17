/*
TODO (security): Rate limiting is intentionally disabled for now.
Nothing imports this file while it is disabled. Uncomment this file and the
middleware lines in routes/auth.routes.js when you decide on the limits.

const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit');

const emailKeyGenerator = (req) => (req.body?.email || ipKeyGenerator(req.ip))
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    keyGenerator: emailKeyGenerator,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many login attempts. Please try again later.' }
})

const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 5,
    keyGenerator: emailKeyGenerator,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many signup attempts. Please try again later.' }
})

const verifyOtpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    keyGenerator: emailKeyGenerator,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many verification attempts. Please try again later.' }
})


module.exports = {
    loginLimiter, signupLimiter, verifyOtpLimiter
}
*/
