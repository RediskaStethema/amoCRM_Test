import express from "express";
import axios from "axios";
import dotenv from 'dotenv';
import * as fs from "node:fs";
dotenv.config();



export const authRoutes = express.Router();
authRoutes.get('/', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).send('No code provided');
    }
    try {
        const tokenRes = await axios.post(
            `https://${process.env.AMO_BASE_DOMAIN}/oauth2/access_token`,
            {
                client_id: process.env.AMO_CLIENT_ID,
                client_secret: process.env.AMO_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.AMO_REDIRECT_URI,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const tokenData = tokenRes.data;
        fs.writeFileSync('./tokens.json', JSON.stringify(tokenData, null, 2));
        console.log('TOKEN saved:', tokenData);
        res.json({
            status: 'success',
            token: tokenData,
        });
    } catch (error) {
        console.error('Error token response:', error);
        res.status(500).json({ error: 'Error token response' });
    }
});

