const express = require('express');
const User = require ('../models/user');
const router = express.Router();
const userController = require('../controller/AuthController')

router.get('/:user_id', [], userController.getUser);
router.post('/',[],userController.create)



module.exports=router;