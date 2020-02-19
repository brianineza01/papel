import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import bodyParser from "body-parser";
import authRoutes from './Routes/auth';
app.listen(3000, () => console.log(`Server listening on port 3000!`));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.raw("application/JSON"))

app.use('/auth', authRoutes);

export default app;
