const express = require('express');
const router = express.Router();

const passport = require('passport');

const postController = require('../controller/posts_controller');

router.post('/create-post', passport.checkAuthentication ,postController.createpost);
router.get('/delete/:id',passport.checkAuthentication,postController.destroy);

module.exports = router;