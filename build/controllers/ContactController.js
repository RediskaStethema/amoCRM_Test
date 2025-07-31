export class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    createContact(contact) {
        return this.contactService.createContact(contact);
    }
    findContactByPhone(phone) {
        return this.contactService.findContactByPhone(phone);
    }
    updateContactByAmoId(amo_id, updateData) {
        return this.contactService.updateContactByAmoId(amo_id, updateData);
    }
}
