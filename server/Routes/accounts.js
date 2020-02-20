import { Router } from 'express';
import { Client } from 'pg';
import { config } from 'dotenv';
import { listofaccounts } from "../controllers/accounts-control";
config();
const client = new Client(process.env.DB_CONNECT);
client.connect();
const router = Router();
//view the list of all bank accounts ,list of all active and dormant accounts
router.get('/' , listofaccounts)
export default router;
