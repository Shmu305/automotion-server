const router = require('express').Router();
const currentController = require('../controllers/currentController');

const authenticate = require('../middleware/authenticate');

router.use(authenticate);

router
    .route('/')
    .get(currentController.current);

module.exports = router;


