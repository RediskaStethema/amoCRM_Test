import {contactData, newContact} from "../utils/types.js";
import {pool} from "../configure/conf.js";
import {updData, WhatUPd} from "../utils/tools.js";
import {IContactService} from "../models/modeles.js";


export class ContactService implements IContactService {
    async createContact(contact: contactData): Promise<newContact> {
        const checkSql = `SELECT * FROM contacts WHERE phone = ?`;
        const [checkRows] = await pool.query(checkSql, [contact.phone]);
        if (Array.isArray(checkRows) && checkRows.length > 0) {
            throw new Error('Contact already exists');
        }
        const sql = `INSERT INTO contacts (amo_id, name, phone, email) VALUES (?, ?, ?, ?)`;
        const params = [contact.amo_id, contact.name, contact.phone, contact.email];
        const [result] = await pool.query(sql, params);
        if (!result || (result as any).affectedRows === 0) {
            throw new Error('Contact not created');
        }
        const newContact: newContact = {
            status: true,
            created: new Date().toISOString(),
            contact: {
                name: contact.name,
                amo_id: contact.amo_id,
                phone: contact.phone,
                email: contact.email,
            },
        };

        return newContact;
    }

    async findContactByPhone(phone: string): Promise<contactData | null> {
        const sql = `SELECT amo_id, name, phone, email FROM contacts WHERE phone = ? LIMIT 1`;
        const [rows] = await pool.query(sql, [phone]);
        const contacts = rows as contactData[];
        return contacts.length > 0 ? contacts[0] : null;
    }

    async updateContactByAmoId(amo_id: number, updateData: contactData): Promise<contactData> {
        const newdata: updData = {contact: {...updateData, amo_id}};
        const newreq = await WhatUPd(newdata);
        if (!newreq) throw new Error("No fields to update");
        const {sql, params} = newreq;
        await pool.execute(sql, params);
        const [rows] = await pool.execute('SELECT * FROM contacts WHERE amo_id = ?', [amo_id]);
        const contacts = rows as contactData[];
        if (contacts.length === 0) throw new Error(`Contact with amo_id ${amo_id} not found`);
        return contacts[0];
    }
}
