import { DealService} from "../services/DealService.js";
import {config} from "../utils/types.js";
import mysql from 'mysql2/promise'
import {ContactService} from "../services/ContactService.js";
import dotenv from 'dotenv';
dotenv.config();
export const  configurations:config= {
    Deal_Service:new DealService(),
    Contact_Service:new ContactService()
}
export const pool=mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS,
    database: process.env.DB_NAME ||'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});