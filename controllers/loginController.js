const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// [ROUTE] - "/auth/login"
// [POST] - Creates & sends JWT for user authorization
exports.login = (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).send("Please enter the required fields.");
    }

    // Find the user
    knex('users')
        .where({ email: email })
        .first()
        .then((user) => {
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);

            if (!isPasswordCorrect) {
                return res.status(400).send("Password for this user does not exist!");
            }

            // Create a token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_KEY,
                { expiresIn: "24h" }
            );

            res.json({ token, user });
        })
        .catch(() => {
            res.status(400).send("Invalid credentials");
        });
};