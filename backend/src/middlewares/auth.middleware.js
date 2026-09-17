const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/user.repo');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            userId: payload.userId,
            email: payload.email,
            isOrganizer: payload.isOrganizer
        };

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
}

async function requireOrganizer(req, res, next) {
    try {
        const { isOrganizer } = req.user;

        if (!isOrganizer) {
            return res.status(403).json({
                success: false,
                message: 'Organizer access is required.',
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

module.exports = {
    authMiddleware,
    requireOrganizer
}

