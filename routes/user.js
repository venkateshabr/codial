const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');
const passport = require('passport');


router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.get('/sign-in',passport.checkSignedin,userController.signin);
router.get('/sign-up',passport.checkSignedin,userController.Signup);
router.post('/create',userController.create);
router.post('/update/:id',userController.update);

//using middleware for authentication using passport
router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect : '/user/sign-in'}
) ,userController.cretesession);


router.get('/sign-out',userController.destroysession);

module.exports = router;