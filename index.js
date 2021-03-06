require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const registerRoute = require('./routes/registerRoute');
const currentRoute = require('./routes/currentRoute');
const loginRoute = require('./routes/loginRoute');
const port = 8080;

//middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/register', registerRoute);
app.use('/current', currentRoute);
app.use('/login', loginRoute);


//port listener
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})