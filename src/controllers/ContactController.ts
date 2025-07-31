import {ContactService} from "../services/ContactService.js";
import {contactData, newContact} from "../utils/types.js";


export class ContactController {
    constructor(private contactService: ContactService) {}

    createContact(contact: contactData): Promise<newContact> {
        return this.contactService.createContact(contact);
    }

    findContactByPhone(phone: string): Promise<contactData | null> {
        return this.contactService.findContactByPhone(phone);
    }

    updateContactByAmoId(amo_id: number, updateData: contactData): Promise<contactData | null> {
        return this.contactService.updateContactByAmoId(amo_id, updateData);
    }
}