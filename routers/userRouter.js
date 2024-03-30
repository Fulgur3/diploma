const express = require('express');
const User = require ('../models/user');
const router = express.Router();
const userController = require('../controller/AuthController')

router.get('/', [], userController.getUser);

module.exports=router;