const User = require('../models/user');

class authController {

	async getUser (req, res) {
		try {
			User.loadById(1)
				.then(userObj => {
					const user = new User(userObj);
					return res.status(200).json(user);
				})
				.catch(err => {
					res.status(400).json(err.message);
				})
		} catch (error) {
			return res.status(400).json(error.message)
		}
	}
}

module.exports = new authController();