import {TransactionService} from '../src/domains/transaction/transaction.service';
import { TransactionModelFirestore } from '../src/domains/transaction/transaction.model.firestore';

describe("Test transaction service functionality", () => {
    const model = new TransactionModelFirestore({
        id: "store-0000000",
        name: "Daily Coffee"
    })
    const service = new TransactionService(model);
    
    it('should return list of transaction or empty array, when fetch by Date', async () => {
        expect.assertions(1);
        let result = await service.fetchByDate((new Date()));
        expect(result).toBeInstanceOf(Array);
    });

    it('should return list of transaction or empty array, when fetch by date interval', async () => {
        expect.assertions(1);
        let result = await service.fetchByDateRange((new Date("2018-4-4")), (new Date()));
        expect(result).toBeInstanceOf(Array);
    });
});