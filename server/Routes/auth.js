import { Router } from 'express';
import { Client } from 'pg';
import { config } from 'dotenv';
config();
const client = new Client(process.env.DB_CONNECT);
const router = Router();
import { usersignup } from '../controllers/user-auth';
import { validateUser } from "../middleware/validateUser";
//create user account
router.post('/signup', validateUser ,usersignup);
export default router;
