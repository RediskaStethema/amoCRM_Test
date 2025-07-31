import express from "express";
import {ContactController} from "../controllers/ContactController.js";
import {configurations} from "../configure/conf.js";
import dotenv from "dotenv";
dotenv.config();

export const contactRouter = express.Router();
const controller = new ContactController(configurations.Contact_Service);

contactRouter.post('/newContact', async (req, res) => {
    try {
        const data = req.body;
        if (!data) return res.status(400).send('No contact data provided');

        const result = await controller.createContact(data);
        res.status(201).json(result);
    } catch (error: any) {
        console.error('Error creating contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

contactRouter.put('/setContact', async (req, res) => {
    try {
        const { amo_id, updateData } = req.body;
        if (!amo_id || !updateData) {
            return res.status(400).send('amo_id and updateData are required');
        }

        const updatedContact = await controller.updateContactByAmoId(amo_id, updateData);
        if (!updatedContact) return res.status(404).send(`Contact with amo_id ${amo_id} not found`);

        res.status(200).json(updatedContact);
    } catch (error: any) {
        console.error('Error updating contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


contactRouter.get('/findContact/:phone', async (req, res) => {
    try {
        const phone = req.params.phone;
        if (!phone) return res.status(400).send('Phone parameter is required');

        const contact = await controller.findContactByPhone(phone);
        if (!contact) return res.status(404).send(`Contact with phone ${phone} not found`);

        res.status(200).json(contact);
    } catch (error: any) {
        console.error('Error finding contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
