import { Router } from 'express';
import { Client } from 'pg';
import { config } from 'dotenv';
import {
    listofaccounts, createAccount,
    specificinfo, Deleteaccount,
    changeStatus, historyofaccounts
} from "../controllers/accounts-control";
import { validateAccount } from "../middleware/validateaccount";
import { checkacc , verifyAdmin , verifyStaff} from "../middleware/check-acc";
config();
const client = new Client(process.env.DB_CONNECT);
client.connect();
const router = Router();
//view the list of all bank accounts ,list of all active and dormant accounts
router.get('/', verifyStaff ,listofaccounts);
//create bank account
router.post('/', verifyAdmin, validateAccount, createAccount);
//view specific account information
router.get('/:accountnumber',verifyStaff,specificinfo)
//delete an account
router.delete('/:accountnumber', verifyAdmin,Deleteaccount)
//activate or deactivate an account
router.patch('/:accountnumber', checkacc ,changeStatus)
//transaction 
router.get('/:accountnumber/transactions', verifyStaff ,historyofaccounts);
export default router;
