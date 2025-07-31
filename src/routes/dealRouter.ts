import express from "express";
import {dealData} from "../utils/types.js";
import {DealController} from "../controllers/DealController.js";
import {configurations} from "../configure/conf.js";
import dotenv from "dotenv";
dotenv.config();

export const dealRouter = express.Router();
const controller = new DealController(configurations.Deal_Service);

dealRouter.post('/newDeal', async (req, res) => {
    try {
        const data = req.body;
        if (!data) return res.status(400).send('No deal data provided');

        const result = await controller.createDeal(data);
        res.status(201).json(result);
    } catch (error: any) {
        console.error('Error creating deal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

dealRouter.put('/setDeal', async (req, res) => {
    try {
        const { amo_id, updateData } = req.body;
        if (!amo_id || !updateData) {
            return res.status(400).send('amo_id and updateData are required');
        }

        const updatedDeal = await controller.updateDealByAmoId(amo_id, updateData);
        if (!updatedDeal) return res.status(404).send(`Deal with amo_id ${amo_id} not found`);

        res.status(200).json(updatedDeal);
    } catch (error: any) {
        console.error('Error updating deal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

dealRouter.get('/findDeal/:amo_id', async (req, res) => {
    try {
        const amo_id = Number(req.params.amo_id);
        if (isNaN(amo_id)) return res.status(400).send('Invalid amo_id');

        const deal = await controller.findDealByAmoId(amo_id);
        if (!deal) return res.status(404).send(`Deal with amo_id ${amo_id} not found`);

        res.status(200).json(deal);
    } catch (error: any) {
        console.error('Error finding deal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
