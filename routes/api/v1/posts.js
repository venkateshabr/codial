const express = require('express');
const passport = require('passport');
const router = express.Router();
const post_api_controller = require('../../../controller/api/v1/posts_api');



router.get('/',post_api_controller.index);
router.delete('/delete/:id',passport.authenticate('jwt',{session : false}),post_api_controller.destroy);

module.exports = router;