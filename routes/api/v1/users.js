const express = require('express');
const router = express.Router();
const user_api_controller = require('../../../controller/api/v1/users_api');

router.use('/',user_api_controller.cretesession);

module.exports = router;