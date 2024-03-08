require('dotenv').config();
const pgdb = require('../utils/postgres');
const getConnection = require('../utils/dbutils');
const tokenUtils = require('../utils/token');
const jwt = require('jsonwebtoken');

exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const result = await getConnection('SELECT * FROM member WHERE email = $1', [email]);
        if (!result.state) {
            return res.status(401).json({ message: 'DB Error' });
        }
        const user = result.rows[0];
        if (!user) {
            return res.status(401).json({ message: '아이디가 일치하지 않습니다.' });
        }
        if (password !== user.password) {
            return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        }
        
        const accessToken = tokenUtils.makeToken({ id: email });
        const refreshToken = tokenUtils.makeRefreshToken();

        const insertResult = await getConnection('INSERT INTO token(email, token) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET token = $2', [email, refreshToken]);

        if (!insertResult.state) {
            return res.status(401).json({ message: 'DB Error' });
        }
        return res.status(200).json({ email, accessToken, refreshToken });
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.refresh = async (req, res) => {
    if (!req.headers.authorization || !req.headers.refresh) {
        return res.status(400).json({ message: 'Access token and refresh token are needed for refresh' });
    }

    const accessToken = req.headers.authorization.split(' ')[1];
    const refreshToken = req.headers.refresh;

    const authResult = tokenUtils.verify(accessToken);
    const decoded = jwt.decode(accessToken);

    if (!decoded) {
        return res.status(401).json({ message: '권한없음' });
    }

    if (authResult.ok === false && authResult.message === 'jwt expired') {
        const refreshResult = await tokenUtils.refreshVerify(refreshToken, decoded.id);
        if (!refreshResult) {
            return res.status(401).json({ message: '다시 로그인해주세요.' });
        } else {
            const newAccessToken = tokenUtils.makeToken({ id: decoded.id });
            return res.status(200).json({ accessToken: newAccessToken, refreshToken });
        }
    } else {
        return res.status(401).json({ message: 'Access token is not expired' });
    }
};

exports.signUp = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const resp = await pgdb.query('SELECT * FROM member where email = $1',[email]);
        if (resp.rows.length > 0){
            return res.status(409).json({ error: '이미 존재하는 이메일입니다.' });
        }
        else{
            const query = {
                text: 'INSERT INTO member (email, password, name) VALUES($1, $2, $3) RETURNING *',
                values: [email, password, name]
            };
            await pgdb.query(query);
            return res.status(200).json({ success : true});
        }
    } 
    catch (error) {
        console.error('Error inserting member:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};