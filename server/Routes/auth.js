import { Router } from 'express';
import { Client } from 'pg';
import { config } from 'dotenv';
config();
const client = new Client(process.env.DB_CONNECT);
const router = Router();
import { usersignup , userlogin} from '../controllers/user-auth';
import { validateUsersignup , validateUserlogin } from "../middleware/validateUser";
//create user account
router.post('/signup', validateUsersignup ,usersignup);
router.post('/login' , validateUserlogin , userlogin);
export default router;
