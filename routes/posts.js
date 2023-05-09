const express = require('express');
const router = express.Router();

const passport = require('passport');

const postController = require('../controller/posts_controller');

router.post('/create-post', passport.checkAuthentication ,postController.createpost);

module.exports = router;