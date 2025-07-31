var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from "../configure/conf.js";
import { WhatUPd } from "../utils/tools.js";
export class ContactService {
    createContact(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkSql = `SELECT * FROM contacts WHERE phone = ?`;
            const [checkRows] = yield pool.query(checkSql, [contact.phone]);
            if (Array.isArray(checkRows) && checkRows.length > 0) {
                throw new Error('Contact already exists');
            }
            const sql = `INSERT INTO contacts (amo_id, name, phone, email) VALUES (?, ?, ?, ?)`;
            const params = [contact.amo_id, contact.name, contact.phone, contact.email];
            const [result] = yield pool.query(sql, params);
            if (!result || result.affectedRows === 0) {
                throw new Error('Contact not created');
            }
            const newContact = {
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
        });
    }
    findContactByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT amo_id, name, phone, email FROM contacts WHERE phone = ? LIMIT 1`;
            const [rows] = yield pool.query(sql, [phone]);
            const contacts = rows;
            return contacts.length > 0 ? contacts[0] : null;
        });
    }
    updateContactByAmoId(amo_id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newdata = { contact: Object.assign(Object.assign({}, updateData), { amo_id }) };
            const newreq = yield WhatUPd(newdata);
            if (!newreq)
                throw new Error("No fields to update");
            const { sql, params } = newreq;
            yield pool.execute(sql, params);
            const [rows] = yield pool.execute('SELECT * FROM contacts WHERE amo_id = ?', [amo_id]);
            const contacts = rows;
            if (contacts.length === 0)
                throw new Error(`Contact with amo_id ${amo_id} not found`);
            return contacts[0];
        });
    }
}
