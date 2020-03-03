import { Router } from 'express';
import { Client } from 'pg';
import { config } from 'dotenv';
import { checkacc } from "../middleware/check-acc";
import { validateUseremail } from "../middleware/validateUser";
import { listAccountOwner } from "../controllers/user-control";
config();
const client = new Client(process.env.DB_CONNECT);
client.connect();
const router = Router();
router.get('/:email/accounts',  checkacc, listAccountOwner)
export default router;
