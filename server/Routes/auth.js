import { Router } from 'express';
import { Client } from 'pg';
import { config } from 'dotenv';
config();
const client = new Client(process.env.DB_CONNECT);
const router = Router();
import { usersignup } from '../controllers/user-auth';

//create user account
router.post('/signup',usersignup);

export default router;
