const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { createToken } = require('../services/auth');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER',
        },

        salt: {
            type: String,
        },

        profileImg: {
            type: String,
            default: '/images/avatar.jpg',
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = randomBytes(16).toString('hex');

    const hashedPassword = createHmac('sha256', salt)
        .update(this.password)
        .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;
});

userSchema.statics.matchPasswordandGenerateToken = async function (
    email,
    password
) {
    const user = await this.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    const hashedPassword = createHmac('sha256', user.salt)
        .update(password)
        .digest('hex');

    if (hashedPassword !== user.password) {
        throw new Error('Incorrect Password');
    }

    return createToken(user);
};

const User = model('user', userSchema);

module.exports = User;