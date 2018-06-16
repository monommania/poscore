import { TransactionModelFirestore } from "./transaction.model.firestore";
import { getDateNow, getDateString } from "../../modules/datetime";

export class TransactionService {
    model: TransactionModelFirestore;
    constructor(model) {
        this.model = model;
    }

    fetchByDate(date: Date) {
        return this.model.fetchByDate(getDateString(date))
            .then(result => Promise.resolve(result))
            .catch(error => Promise.resolve(error));
    }

    fetchByDateRange(fromDate: Date, toDate: Date) {
        return this.model.fetchByDateRange(fromDate.getTime(), toDate.getTime())
            .then(result => Promise.resolve(result))
            .catch(error => Promise.resolve(error));
    }
    
    listGroupedTransactionByRange(fromDate: Date, toDate: Date) {
        return this.model.listGroupedTransactionByRange(fromDate.getTime(), toDate.getTime())
            .then(result => Promise.resolve(result))
            .catch(error => Promise.resolve(error));
    }
}

