const db = require('../database/db');

class UserDAO {
    constructor() {

    }
    findById (id) {
        return new Promise(( resolve, reject ) => {
            const sql = `SELECT * FROM user WHERE id = ${id}`;

            db.query(sql, (err, result) => {
                if(err)
                    return reject(err)

                return resolve(result[0]);
            })
        })
    }

    findByEmail(email) {
        return new Promise(( resolve, reject ) => {
            const sql = `SELECT * FROM user WHERE email ='${email}'`;

            db.query(sql, (err, result) => {
                if(err)
                    throw err;

                return resolve(result[0])
            })
        })
    }

   create (values) {
        return new Promise(( resolve, reject ) => {
            const sql = `INSERT INTO user (username, email, password) VALUES (?)`;

            db.query(sql, [values], (err, result) => {
                if(err)
                    throw err
                
                return resolve(result.insertId)
            })
        })
    }

    update () {
        return new Promise(( resolve, reject ) => {
            const sql = ''

            db.query(sql, [values], (err, result) => {
                if(err)
                    throw err;
            })
        })
    }
}


module.exports = new UserDAO();