const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');

router.get('/profile',userController.profile);
router.get('/sign-in',userController.signin);
router.get('/sign-up',userController.Signup);
router.post('/create',userController.create)
router.post('/createsession',userController.cretesession);


module.exports = router;