import express from 'express';
import dotenv from 'dotenv';
import { createtable , truncatetable } from "./database/tables";
dotenv.config();
const app = express();
import bodyParser from "body-parser";
import authRoutes from './Routes/auth';
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.raw("application/JSON"))
app.use('/auth', authRoutes);
app.listen(process.env.PORT || 3000, () => {
    createtable();
    if(process.env.NODE_ENV == 'test') {
        truncatetable();
    }
    console.log(`Server listening on port 3000!`)
});
export default app;
