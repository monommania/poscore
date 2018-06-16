import { TransactionModelFirestore } from "./transaction.model.firestore";
export declare class TransactionService {
    model: TransactionModelFirestore;
    constructor(model: any);
    fetchByDate(date: Date): Promise<any>;
    fetchByDateRange(fromDate: Date, toDate: Date): Promise<any>;
    listGroupedTransactionByRange(fromDate: Date, toDate: Date): Promise<any>;
}
