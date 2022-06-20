const knex = require('knex')(require('../knexfile'));

// [ROUTE] - "/auth/current"
// [GET] - Gets currently logged in user to validate JWT authentication
exports.current = (req, res) => {

    knex('users')
        .where({ email: req.user.email })
        .first()
        .then((user) => {
            // Respond with the user data
            delete user.password;
            res.json(user);
        });
};
