const express = require('express');

const app = express();

const myParser = require("body-parser");



const authRoutes = require('./Routes/auth');


app.use(myParser.urlencoded({
    extended: true
}))
app.use('/auth', authRoutes);


module.exports = app;
