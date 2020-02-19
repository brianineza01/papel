import { Router } from 'express';
import { Client } from 'pg';
import { config } from 'dotenv';
config();
const client = new Client(process.env.DB_CONNECT);
const router = Router();
import { usersignup } from '../controllers/user-auth';

router.get('/', (req, resp) => {
    resp.status(200).json({ message :"auth route is working"});
});


//create user account
router.post('/signup',usersignup);

export default router;
