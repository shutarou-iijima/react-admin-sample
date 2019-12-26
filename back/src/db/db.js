const pg = require('pg');
let pool = null;

const doQuery = (query) => {
    if (pool === null) {
        console.log('create db connection pool');
        pool = new pg.Pool({
            database: process.env.DB || 'postgres',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'password',
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
        });
    }

    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                client.release();
                reject(err);
                return
            }
            client.query(query, (err, res) => {
                client.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            });
        })
    })
};

module.exports = doQuery;
