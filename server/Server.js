import express from 'express';
import dotenv from 'dotenv';
import { createtable, truncatetable } from "./database/tables";
import bodyParser from "body-parser";
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';
import authRoutes from './Routes/auth';
import accountRoutes from "./Routes/accounts";
import transactionRoute from "./Routes/transaction"
import userRoute from './Routes/user'

var os = require("os")
console.log(os.hostname());

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw("application/JSON"))
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/auth', authRoutes);
app.use('/accounts', accountRoutes)
app.use('/transactions', transactionRoute)
app.use('/user', userRoute)
app.use('/', (req, res) => {
    console.log(req.hostname);
    return res.status(200).send({
        status: 200,
        message: `Papel is a light-weight core banking application 
        that powers banking operations like \n account creation, customer deposits,
        and withdrawals. This app is meant to support a single bank, \n
        where users can signup and create bank accounts online, but must visit 
        the branch to withdraw or deposit money. Please visit the following link for documentation`,
        data: `${process.env.SITE_URL}/documentation`
    })
})
app.use((req, res) => res.status(404).send({
    status: 404,
    error: 'PAGE NOT FOUND',
}));
app.listen(process.env.PORT || 3000, () => {
    createtable();
    if (process.env.NODE_ENV == 'test') {
        truncatetable();
    }
    console.log(`Server listening on port 3000!`)
});
export default app;
