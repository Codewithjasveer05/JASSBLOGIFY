const { verifyToken } = require('../services/auth');

function checkForAuth(cookieName) {
    return (req, res, next) => {
        const token = req.cookies[cookieName];

        if (!token) {
            return next();
        }

        try {
            const user = verifyToken(token);
            req.user = user;
        } catch (error) {
            console.log(error.message);
        }

        next();
    };
}

module.exports = {
    checkForAuth,
};