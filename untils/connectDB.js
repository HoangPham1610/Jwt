const mysql = require('mysql');
require('dotenv').config();
const config  = {
  connectionLimit: 10,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASS,
  database        : process.env.DB_NAME
};

const pool = new mysql.createPool(config);

exports.load = (sql) => {
	return new Promise((resolve, reject) => {
		pool.getConnection(function (err, connection) {
			if (err) {
				reject(err)
			} else {
                console.log('connect success');
				connection.query(sql, function (error, rows, fields) {
					connection.release();

					if (error) {
                        console.log(error);
						reject(error);
					} else {
						resolve(JSON.parse(JSON.stringify(rows)));
					}

				});
			}
		});
	});
}

exports.save = sql => {
	return new Promise((resolve, reject) => {
		pool.getConnection(function (err, connection) {
			if (err) {
				reject(err)
			} else {

				console.log('establish connection');

				connection.query(sql, function (error, value) {

					connection.release();

					console.log('release connection');
					if (error) {
						reject(error)
					} else {
						resolve(value);
					}
				});
			}
		});
	});
}