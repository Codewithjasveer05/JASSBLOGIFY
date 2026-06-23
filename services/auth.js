const JWT = require('jsonwebtoken');

const secret =  process.env.JWT_SECRET;

function createToken(user) {
    return JWT.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role,
        },
        secret
    );
}

function verifyToken(token) {
    return JWT.verify(token, secret);
}

module.exports = {
    createToken,
    verifyToken,
};