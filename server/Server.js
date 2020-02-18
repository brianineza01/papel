const express = require('express');

const app = express();

const application = require('./app');

app.use('/', application)
app.listen(3000, () => console.log(`Server listening on port 3000!`));
