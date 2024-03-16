const pool = require('./postgres');

async function getConnection(sql, params) {
    try {
        const client = await pool.connect();
        const { rows } = await client.query(sql, params);
        client.release();
        return { state: true, rows };
    } catch (err) {
        console.error('Error executing query:', err);
        return { state: false, error: err };
    }
}

module.exports = getConnection;