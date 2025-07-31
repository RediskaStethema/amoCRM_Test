export class DealController {
    constructor(dealService) {
        this.dealService = dealService;
    }
    createDeal(deal) {
        return this.dealService.createDeal(deal);
    }
    findDealByAmoId(amo_id) {
        return this.dealService.findDealByAmoId(amo_id);
    }
    updateDealByAmoId(amo_id, updateData) {
        return this.dealService.updateDealByAmoId(amo_id, updateData);
    }
}
