import { Router } from 'express';
import { Client } from 'pg';
import { config } from 'dotenv';
import { transactionDebit, transactionCredit, specificTransaction } from "../controllers/transaction-control";
import { checkacc , verifyStaff } from "../middleware/check-acc";
import { validateTransaction } from "../middleware/validateTransaction";
config();
const client = new Client(process.env.DB_CONNECT);
client.connect();
const router = Router();
router.post('/:accountnumber/debit', verifyStaff, validateTransaction, transactionDebit);
router.post('/:accountnumber/credit', verifyStaff, validateTransaction, transactionCredit);
router.get('/:transactionid', checkacc, specificTransaction);
export default router;
