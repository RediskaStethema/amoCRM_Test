import { dealData, newDeal} from "../utils/types.js";
import {pool} from "../configure/conf.js";
import {updData, WhatUPd} from "../utils/tools.js";
import {IDealService} from "../models/modeles.js";


export class DealService implements IDealService {
    async createDeal(deal: dealData): Promise<newDeal> {
        const checkSql = `SELECT id FROM deals WHERE name = ?`;
        const [existingRows] = await pool.query(checkSql, [deal.name]);

        if (Array.isArray(existingRows) && existingRows.length > 0) {
            throw new Error('Deal with this name already exists');
        }
        const insertSql = `INSERT INTO deals (amo_id, name, status, contact_id) VALUES (?, ?, ?, ?)`;
        const params = [deal.amo_id, deal.name, deal.status, deal.contact_id];
        const [result] = await pool.query(insertSql, params);

        if (!result || (result as any).affectedRows === 0) {
            throw new Error('Deal creation failed');
        }
        const resultDeal: newDeal = {
            status: true,
            created: new Date().toISOString(),
            deal: {
                amo_id: deal.amo_id,
                name: deal.name,
                status: deal.status,
                contact_id: deal.contact_id as number,
            },
        };

        return resultDeal;
    }
    async findDealByAmoId(amo_id: number): Promise<dealData | null> {
        const sql = `SELECT amo_id, name, status, contact_id FROM deals WHERE amo_id = ? LIMIT 1`;
        const [rows] = await pool.query(sql, [amo_id]);
        const deals = rows as dealData[];
        return deals.length > 0 ? deals[0] : null;
    }
    async updateDealByAmoId(amo_id: number, updateData: dealData): Promise<dealData | null> {
        const newdata: updData = {deal: {...updateData, amo_id}};
        const newreq = await WhatUPd(newdata);
        if (!newreq) throw new Error("No fields to update");
        const {sql, params} = newreq;
        await pool.execute(sql, params);
        const [rows] = await pool.execute('SELECT * FROM deals WHERE amo_id = ?', [amo_id]);
        const deals = rows as dealData[];
        return deals.length > 0 ? deals[0] : null;
    }
}
