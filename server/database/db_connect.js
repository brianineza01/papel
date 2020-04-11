import { Client } from 'pg';
import { config } from 'dotenv';
config();
const client = new Client(process.env.DB_CONNECT);
export default  client;
