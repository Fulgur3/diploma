const express = require('express');
const User = require ('../models/user');
const router = express.Router();

router.get('/',[],function(req, res){
    res.json(User.loadById(0))
});

module.exports=router;