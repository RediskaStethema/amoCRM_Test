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
import { DealController } from "../controllers/DealController.js";
import { configurations } from "../configure/conf.js";
import dotenv from "dotenv";
dotenv.config();
export const dealRouter = express.Router();
const controller = new DealController(configurations.Deal_Service);
dealRouter.post('/newDeal', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (!data)
            return res.status(400).send('No deal data provided');
        const result = yield controller.createDeal(data);
        res.status(201).json(result);
    }
    catch (error) {
        console.error('Error creating deal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
dealRouter.put('/setDeal', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amo_id, updateData } = req.body;
        if (!amo_id || !updateData) {
            return res.status(400).send('amo_id and updateData are required');
        }
        const updatedDeal = yield controller.updateDealByAmoId(amo_id, updateData);
        if (!updatedDeal)
            return res.status(404).send(`Deal with amo_id ${amo_id} not found`);
        res.status(200).json(updatedDeal);
    }
    catch (error) {
        console.error('Error updating deal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
dealRouter.get('/findDeal/:amo_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const amo_id = Number(req.params.amo_id);
        if (isNaN(amo_id))
            return res.status(400).send('Invalid amo_id');
        const deal = yield controller.findDealByAmoId(amo_id);
        if (!deal)
            return res.status(404).send(`Deal with amo_id ${amo_id} not found`);
        res.status(200).json(deal);
    }
    catch (error) {
        console.error('Error finding deal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
