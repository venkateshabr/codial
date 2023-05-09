const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

router.get('/',homeController.home);
router.use('/user',require('./user'));
router.use('/post',require('./posts'));
router.use('/comment',require('./comments'));

module.exports = router;