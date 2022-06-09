const jwt = require('jsonwebtoken');
const knex = require('knex')(require('../knexfile'));
// const bcrypt = require('bcryptjs');
// - Expected headers: { Authorization: "Bearer JWT_TOKEN_HERE" }
const authenticate = (req, res, next) => {
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

        knex('users')
            .where({ email: decoded.email })
            .first()
            .then((user) => {
                // Respond with the user data
                delete user.password;
                res.json(user);
            });
    });
}

module.exports = authenticate;