import { contactData,  dealData, newContact, newDeal} from "../utils/types.js";

export interface IContactService {
    createContact(contact: contactData): Promise<newContact>;
    findContactByPhone(phone: string): Promise<contactData | null>;
    updateContactByAmoId(amo_id: number, updateData: contactData): Promise<contactData>;
}
export interface IDealService {
    createDeal(deal: dealData): Promise<newDeal>;
    findDealByAmoId(amo_id: number): Promise<dealData | null>;
    updateDealByAmoId(amo_id: number, updateData: dealData): Promise<dealData | null>;
}