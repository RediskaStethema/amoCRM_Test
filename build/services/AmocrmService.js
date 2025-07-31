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
export class DealService {
    createContact(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkSql = `SELECT * FROM contacts WHERE amo_id = ?`;
            const checkResult = yield pool.query(checkSql, [contact.amo_id]);
            if (Array.isArray(checkResult) && checkResult[0].length > 0) {
                throw new Error('Contact is exist');
            }
            const sql = `INSERT INTO contacts (amo_id, name, phone, email) VALUES (?, ?, ?, ?)`;
            const params = [contact.amo_id, contact.name, contact.phone, contact.email];
            const result = yield pool.query(sql, params);
            if (!result)
                throw new Error('Contact not created');
            const result_contact = {
                status: true,
                created: new Date().toISOString(),
                contact: {
                    name: contact.name,
                    amo_id: contact.amo_id,
                    phone: contact.phone,
                    email: contact.email,
                },
            };
            return result_contact;
        });
    }
    createDeal(deal) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkSql = `SELECT id FROM deals WHERE amo_id = ?`;
            const [existing] = yield pool.query(checkSql, [deal.amo_id]);
            if (existing.length > 0) {
                throw new Error(`Сделка с amo_id ${deal.amo_id} уже существует`);
            }
            const insertSql = `INSERT INTO deals (amo_id, name, status, contact_id) VALUES (?, ?, ?, ?)`;
            const params = [deal.amo_id, deal.name, deal.status, deal.contact_id];
            const result = yield pool.query(insertSql, params);
            const resultDeal = {
                status: true,
                created: new Date().toISOString(),
                deal: {
                    amo_id: deal.amo_id,
                    name: deal.name,
                    status: deal.status,
                    contact_id: deal.contact_id,
                },
            };
            return resultDeal;
        });
    }
    findContactByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT amo_id, name, phone, email FROM contacts WHERE phone = ? LIMIT 1`;
            const rows = yield pool.query(sql, [phone]);
            const contacts = rows;
            return contacts.length > 0 ? contacts[0] : null;
        });
    }
    findDealByAmoId(amo_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT amo_id, name, status, contact_id FROM deals WHERE amo_id = ? LIMIT 1`;
            const rows = yield pool.query(sql, [amo_id]);
            const deals = rows;
            return deals.length > 0 ? deals[0] : null;
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
            return rows;
        });
    }
    updateDealByAmoId(amo_id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newdata = { deal: Object.assign(Object.assign({}, updateData), { amo_id }) };
            const newreq = yield WhatUPd(newdata);
            if (!newreq)
                throw new Error("No fields to update");
            const { sql, params } = newreq;
            yield pool.execute(sql, params);
            const [rows] = yield pool.execute('SELECT * FROM deals WHERE amo_id = ?', [amo_id]);
            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
        });
    }
}
