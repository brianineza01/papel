const express = require('express');

const app = express();

const application = require('./app');
try {
    app.use('/', application)
} catch (error) {
    console.log(error);

}


app.listen(3000, () => console.log(`Server listening on port 3000!`));