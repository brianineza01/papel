import { Router } from 'express';
import { Client } from 'pg';
import { config } from 'dotenv';
import { listofaccounts, createAccount, specificinfo } from "../controllers/accounts-control";
import { validateAccount } from "../middleware/validateaccount";
config();
const client = new Client(process.env.DB_CONNECT);
client.connect();
const router = Router();
//view the list of all bank accounts ,list of all active and dormant accounts
router.get('/', listofaccounts);
//create bank account
router.post('/', validateAccount, createAccount);
//view specific account information
router.get('/:accountnumber', specificinfo)
export default router;
