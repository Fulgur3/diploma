// const express = require('express');

// const { check } = require('express-validator');

// const router = express.Router();
// const passport = require('passport');

// router.use(passport.initialize());
// router.use(passport.session());

// const controller = require('../controllers/AuthController');

// const refreshMiddleware = require('../middleware/refreshMiddleware');
// const authMiddleware = require('../middleware/authMiddleware');
// const classAccessMiddleware = require('../middleware/classAccessMiddleware');



// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//     done(null, user);
// });

// router.post('/registration',
// [
//     check("first_name", 'Field "First name" cannot be empty').notEmpty(),
//     check("last_name", 'Last "First name" cannot be empty').notEmpty(),
//     check("email", 'Email is incorrect').isEmail(),
//     check("password", 'password must be more than 6 and less than 20 characters').isLength({ min: 6, max: 20 })
// ], controller.registration )

// router.get('/registration/:token', controller.confirmRegistration )

// router.post('/login',
// [
//     check("email", 'Email is incorrect').isEmail(),
//     check("password", 'password must be more than 6 and less than 20 characters').isLength({ min: 6, max: 20 })
// ], controller.login )




// router.delete('/leave/class/:class_id', 
//     [
//         authMiddleware(),
//         classAccessMiddleware()
//     ],
//     controller.leaveClass );

// router.get('/get/user', [
//     authMiddleware()
// ], controller.getUser);





// // router.get("/logout", (req, res, next) => {
// //     req.logout(err => {
// //         if (err) next(err)
// //         req.session.destroy();
// //         res.redirect('/');
// //     })
// // });



// router.get('/refresh/tokens', refreshMiddleware(), controller.refreshTokens )

// module.exports = router;