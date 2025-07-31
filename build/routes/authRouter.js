var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import axios from "axios";
import dotenv from 'dotenv';
import * as fs from "node:fs";
dotenv.config();
export const authRoutes = express.Router();
authRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    if (!code) {
        return res.status(400).send('No code provided');
    }
    try {
        const tokenRes = yield axios.post(`https://${process.env.AMO_BASE_DOMAIN}/oauth2/access_token`, {
            client_id: process.env.AMO_CLIENT_ID,
            client_secret: process.env.AMO_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.AMO_REDIRECT_URI,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const tokenData = tokenRes.data;
        fs.writeFileSync('./tokens.json', JSON.stringify(tokenData, null, 2));
        console.log('TOKEN saved:', tokenData);
        res.json({
            status: 'success',
            token: tokenData,
        });
    }
    catch (error) {
        console.error('Error token response:', error);
        res.status(500).json({ error: 'Error token response' });
    }
}));
