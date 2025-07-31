import {contactData, dealData} from "./types.js";

export const PORT=3000;


export type updData={
    contact?:contactData
    deal?:dealData

}
export const WhatUPd = async (updateData: updData) => {
    if(updateData.deal && updateData.contact){
        throw new Error("Can't update both deal and contact at the same time")
    }

    let params = [];
    let fields = [];

    if (updateData.deal) {
        const deal = updateData.deal;

        if (deal.name !== undefined) {
            fields.push('name = ?');
            params.push(deal.name);
        }
        if (deal.status !== undefined) {
            fields.push('status = ?');
            params.push(deal.status);
        }
        if (deal.contact_id !== undefined) {
            fields.push('contact_id = ?');
            params.push(deal.contact_id);
        }

        if (fields.length === 0) {
            return null;
        }


        params.push(deal.amo_id);

        const sql = `UPDATE deals SET ${fields.join(', ')} WHERE amo_id = ?`;



        return { sql, params };
    }

    if (updateData.contact) {
        const contact = updateData.contact;

        fields = [];
        params = [];
        if (contact.name !== undefined) {
            fields.push('name = ?');
            params.push(contact.name);
        }
        if (contact.phone !== undefined) {
            fields.push('phone = ?');
            params.push(contact.phone);
        }
        if (contact.email !== undefined) {
            fields.push('email = ?');
            params.push(contact.email);
        }
        if (fields.length === 0) {
            return null;
        }
        params.push(contact.amo_id);
        const sql = `UPDATE contacts SET ${fields.join(', ')} WHERE amo_id = ?`;
        return { sql, params };
    }
};