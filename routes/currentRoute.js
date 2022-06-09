const router = require('express').Router();
const currentController = require('../controllers/currentController');

router
    .route('/')
    .get(currentController.current);

module.exports = router;