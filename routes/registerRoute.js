const router = require('express').Router();
const registerController = require('../controllers/registerController');

router
    .route('/')
    .post(registerController.register);

module.exports = router;