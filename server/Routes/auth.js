const express = require('express');
const {
    Client
} = require('pg');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config();
const client = new Client(process.env.DB_CONNECT);
const router = express.Router();
const authController = require('../controllers/user-auth')

router.get('/', (req, resp) => {
    resp.send("auth route is working")
});

//create user account
router.post('/signup',authController.usersignup);

module.exports = router;
