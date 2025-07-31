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
    createDeal(deal) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkSql = `SELECT id FROM deals WHERE name = ?`;
            const [existingRows] = yield pool.query(checkSql, [deal.name]);
            if (Array.isArray(existingRows) && existingRows.length > 0) {
                throw new Error('Deal with this name already exists');
            }
            const insertSql = `INSERT INTO deals (amo_id, name, status, contact_id) VALUES (?, ?, ?, ?)`;
            const params = [deal.amo_id, deal.name, deal.status, deal.contact_id];
            const [result] = yield pool.query(insertSql, params);
            if (!result || result.affectedRows === 0) {
                throw new Error('Deal creation failed');
            }
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
    findDealByAmoId(amo_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT amo_id, name, status, contact_id FROM deals WHERE amo_id = ? LIMIT 1`;
            const [rows] = yield pool.query(sql, [amo_id]);
            const deals = rows;
            return deals.length > 0 ? deals[0] : null;
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
            const deals = rows;
            return deals.length > 0 ? deals[0] : null;
        });
    }
}
