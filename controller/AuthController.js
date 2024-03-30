const User = require('../models/user');

class authController {

	async getUser (req, res) {
		try {
			const user_id = req.params.user_id;
			User.loadById(user_id)
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

	async create(req,res){
		try{
		const {username,email,password}=req.body
		User.create([username,email,password])
			.then(user_id=> {
				User.loadById(user_id)
				.then(userObj => {
					const user = new User(userObj);
					return res.status(200).json(user);
				})})
			.catch(err => {
				res.status(400).json(err.message);
			})
		} catch (error) {
			return res.status(400).json(error.message)
		}
	}
}

module.exports = new authController();