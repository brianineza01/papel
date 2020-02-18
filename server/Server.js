import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import { urlencoded } from "body-parser";
import authRoutes from './Routes/auth';
app.listen(3000, () => console.log(`Server listening on port 3000!`));
app.use(urlencoded({extended: true}))
app.use('/auth', authRoutes);
