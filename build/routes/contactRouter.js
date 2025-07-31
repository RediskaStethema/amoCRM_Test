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
import { ContactController } from "../controllers/ContactController.js";
import { configurations } from "../configure/conf.js";
import dotenv from "dotenv";
dotenv.config();
export const contactRouter = express.Router();
const controller = new ContactController(configurations.Contact_Service);
contactRouter.post('/newContact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (!data)
            return res.status(400).send('No contact data provided');
        const result = yield controller.createContact(data);
        res.status(201).json(result);
    }
    catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
contactRouter.put('/setContact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amo_id, updateData } = req.body;
        if (!amo_id || !updateData) {
            return res.status(400).send('amo_id and updateData are required');
        }
        const updatedContact = yield controller.updateContactByAmoId(amo_id, updateData);
        if (!updatedContact)
            return res.status(404).send(`Contact with amo_id ${amo_id} not found`);
        res.status(200).json(updatedContact);
    }
    catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
contactRouter.get('/findContact/:phone', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phone = req.params.phone;
        if (!phone)
            return res.status(400).send('Phone parameter is required');
        const contact = yield controller.findContactByPhone(phone);
        if (!contact)
            return res.status(404).send(`Contact with phone ${phone} not found`);
        res.status(200).json(contact);
    }
    catch (error) {
        console.error('Error finding contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
