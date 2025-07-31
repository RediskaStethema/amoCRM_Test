import { dealData, newDeal} from "../utils/types.js";
import {DealService} from "../services/DealService.js";


export class DealController {
    constructor(private dealService: DealService) {}

    createDeal(deal: dealData): Promise<newDeal> {
        return this.dealService.createDeal(deal);
    }

    findDealByAmoId(amo_id: number): Promise<dealData | null> {
        return this.dealService.findDealByAmoId(amo_id);
    }

    updateDealByAmoId(amo_id: number, updateData: dealData): Promise<dealData | null> {
        return this.dealService.updateDealByAmoId(amo_id, updateData);
    }
}