import { getDateString } from "../../modules/datetime";
export class TransactionService {
    constructor(model) {
        this.model = model;
    }
    fetchByDate(date) {
        return this.model.fetchByDate(getDateString(date))
            .then(result => Promise.resolve(result))
            .catch(error => Promise.resolve(error));
    }
    fetchByDateRange(fromDate, toDate) {
        return this.model.fetchByDateRange(fromDate.getTime(), toDate.getTime())
            .then(result => Promise.resolve(result))
            .catch(error => Promise.resolve(error));
    }
    listGroupedTransactionByRange(fromDate, toDate) {
        return this.model.listGroupedTransactionByRange(fromDate.getTime(), toDate.getTime())
            .then(result => Promise.resolve(result))
            .catch(error => Promise.resolve(error));
    }
}
