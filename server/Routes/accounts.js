import { Router } from 'express';
import { Client } from 'pg';
import { config } from 'dotenv';
import {
    listofaccounts, createAccount,
    specificinfo, Deleteaccount,
    changeStatus
} from "../controllers/accounts-control";
import { validateAccount } from "../middleware/validateaccount";
import { checkacc } from "../middleware/check-acc";
config();
const client = new Client(process.env.DB_CONNECT);
client.connect();
const router = Router();
//view the list of all bank accounts ,list of all active and dormant accounts
router.get('/', checkacc ,listofaccounts);
//create bank account
router.post('/',checkacc , validateAccount, createAccount);
//view specific account information
router.get('/:accountnumber', checkacc ,specificinfo)
//delete an account
router.delete('/:accountnumber', checkacc ,Deleteaccount)
//acttivate or deactivate an account
router.patch('/:accountnumber', checkacc ,changeStatus)
export default router;
