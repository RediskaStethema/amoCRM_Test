import { DealService} from "../services/DealService.js";
import {ContactService} from "../services/ContactService.js";

export type dealData={
    "name": string,
    "status": string,
    "price"?:number,
    "amo_id":number,
    "contact_id"?: number
}
export type contactData = {
    id?: number;
    amo_id: number;
    name: string;
    phone: string;
    email?: string;
}

export type newContact= {
    status:boolean,
    created: string,
    contact: contactData;
}
export type newDeal={
    status:boolean,
    created: string,
    deal: dealData

}

export type config={
    Deal_Service: DealService,
    Contact_Service: ContactService
}
export type Errortype = {status:number,
    message:string}
