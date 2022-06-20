const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// [ROUTE] - "/register"
// [POST] - Creates new user through registration
exports.register = (req, res) => {

    const {userName, email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword || !userName) {
        return res.status(400).send("All fields are required.");

    }
    else if(password !== confirmPassword){
        return res.status(400).send("Passwords don't match");        
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const user = {
        name: userName,
        email: email, 
        password: hashedPassword
    }
    knex('users')
        .insert(user)
        .then((user) => {
            const token = jwt.sign(
                { email: email },
                process.env.JWT_KEY,
                { expiresIn: "24h" }
            )
            res.json({token, user});
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send("Failed registration");
        });
};