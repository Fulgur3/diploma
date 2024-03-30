const UserDAO = require('../dao/userDAO');

module.exports = class User {
	id;
	username;
	email;
	password;
	created_at;
	updated_at;
	

	constructor({ id, username, email, password, created_at, updated_at }) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	some() {
		console.log(1);
	}

	static loadById(id) {
		return UserDAO.findById(id);
	}

	static loadByEmail(email) {
		return  UserDAO.findByEmail(email);
	}
}
