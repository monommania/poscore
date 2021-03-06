var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fireStorage from './../../storage/firestorage';
export class TransactionModelFirestore {
    constructor(store) {
        this.entityName = "transaction";
        this.store = store;
        this.connection = fireStorage;
    }
    entity(listener = null) {
        return __awaiter(this, void 0, void 0, function* () {
            listener = listener;
            return yield this.connection.then(db => {
                let entity = db.collection(this.store.id).doc(this.entityName).collection('list');
                entity.onSnapshot({ includeQueryMetadataChanges: true }, function (snapshot) {
                    snapshot.docChanges.forEach(function (change) {
                        if (!snapshot.metadata.fromCache) {
                            if (listener)
                                listener(change.type, change.doc.data());
                        }
                    });
                });
                return Promise.resolve(entity);
            });
        });
        var listener;
    }
    fetchByDate(toFilter, listener = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.entity(listener)
                .then(transactions => {
                return transactions
                    .where('date', "==", toFilter)
                    .orderBy('time', 'desc')
                    .get()
                    .then(function (snapshots) {
                    const data = [];
                    snapshots.forEach(doc => {
                        data.push(doc.data());
                    });
                    return Promise.resolve(data);
                })
                    .catch((error) => Promise.reject(error));
            });
        });
    }
    fetchByDateRange(fromFilter, toFilter, listener = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.entity(listener)
                .then(transactions => {
                return transactions
                    .where('time', ">=", fromFilter)
                    .where('time', "<=", toFilter)
                    .orderBy('time', 'desc')
                    .get()
                    .then(function (snapshots) {
                    const data = [];
                    snapshots.forEach(doc => {
                        data.push(doc.data());
                    });
                    return Promise.resolve(data);
                })
                    .catch((error) => Promise.reject(error));
            });
        });
    }
    listGroupedTransactionByRange(fromFilter, toFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fetchByDateRange(fromFilter, toFilter)
                .then(results => {
                let groupedData = [];
                let summary = {
                    qty: 0,
                    total: 0
                };
                results.map(transaction => {
                    let data = groupedData.find(function (data) {
                        return data['date'] == transaction.date;
                    });
                    if (!!data) {
                        data.qty += transaction.summary.qty;
                        data.total += transaction.summary.total;
                        data.list.push(transaction);
                    }
                    else {
                        data = {
                            date: transaction.date,
                            qty: transaction.summary.qty,
                            total: transaction.summary.total,
                            list: [transaction]
                        };
                        groupedData.push(data);
                    }
                    summary.qty += transaction.summary.qty;
                    summary.total += transaction.summary.total;
                });
                return Promise.resolve({ data: groupedData, summary: summary });
            });
        });
    }
}
