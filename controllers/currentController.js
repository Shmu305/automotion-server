const knex = require('knex')(require('../knexfile'));
const { decode } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

// [ROUTE] - "/auth/current"
// [GET] - Gets currently logged in user to validate JWT authentication
exports.current = (authenticate, (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Please login");
    }

    // Parse the Bearer token
    const authToken = req.headers.authorization.split(" ")[1];
    
    // Verify the token
    jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send("Invalid auth token");
        }

        console.log(decoded)
        knex('users')
            .where({ email: decoded.email })
            .first()
            .then((user) => {
                // Respond with the user data
                delete user.password;
                res.json(user);
            });
    });
});