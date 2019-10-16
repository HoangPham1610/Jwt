const conn = require('../untils/connectDB.js');

exports.fetchAll = () => {
    const sql = 'SELECT * FROM user_info';
    return conn.load(sql);
}

exports.registerUser = (username, password, role_id = 2) => {
    const sql = `INSERT INTO user_info (username, password, role_id) VALUES ('${username}', '${password}', ${role_id})`;
    return conn.save(sql);
}
exports.findOne = (username, password) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user_info WHERE username = '${username}' AND password = '${password}'`;
        conn.load(sql)
               .then(rows => {
                    if (rows.length == 0) {
                        resolve(null);
                    }
                    else {
                        resolve(rows[0]);
                    } })
                .catch(err => {
                    reject(err);
        });
    });
}

exports.findOneByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user_info WHERE username = '${username}'`;
        conn.load(sql)
               .then(rows => {
                    if (rows.length == 0) {
                        resolve(null);
                    }
                    else {
                        resolve(rows[0]);
                    } })
                .catch(err => {
                    reject(err);
        });
    });
}