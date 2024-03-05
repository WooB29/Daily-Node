require('dotenv').config();
const getConnection = require('./dbutils');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.ACCESS_TOKEN_SECRET;

exports.makeToken = (payload) => {
    return jwt.sign(payload, JWT_KEY, { expiresIn: '2m' });
};

exports.makeRefreshToken = () => {
    return jwt.sign({}, JWT_KEY, { algorithm: 'HS256', expiresIn: '10m' });
};

exports.refreshVerify = async (token, email) => {
    try {
        const result = await getConnection('SELECT token FROM token WHERE email = $1', [email]);
        if (result.state && result.rows.length > 0) {
            return token === result.rows[0].token;
        }
        return false;
    } catch (err) {
        console.error('Error verifying refresh token:', err);
        return false;
    }
};

exports.verify = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        return { ok: true, id: decoded.id };
    } catch (err) {
        console.error('Error verifying token:', err);
        return { ok: false, message: err.message };
    }
};