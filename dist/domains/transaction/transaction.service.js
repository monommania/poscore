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
        return this.model.fetchByDateRange(getDateString(fromDate), getDateString(toDate))
            .then(result => Promise.resolve(result))
            .catch(error => Promise.resolve(error));
    }
    listGroupedTransactionByRange(fromDate, toDate) {
        return this.model.listGroupedTransactionByRange(getDateString(fromDate), getDateString(toDate))
            .then(result => Promise.resolve(result))
            .catch(error => Promise.resolve(error));
    }
}
