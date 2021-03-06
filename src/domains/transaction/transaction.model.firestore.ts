import fireStorage from './../../storage/firestorage';
import { ICart } from "../cart/cart.interface";
import { IStore } from "../store/store.interface";

export class TransactionModelFirestore {

    store: IStore;
    connection: any;
    entityName = "transaction";

    constructor(store: IStore) {
        this.store = store;
        this.connection = fireStorage;
    }
    
    async entity(listener: Function|null=null) {
        var listener = listener;
        return await this.connection.then(db => {
            let entity = db.collection(this.store.id).doc(this.entityName).collection('list');

            // listen to document/data changes and bind to listener
            entity.onSnapshot({ includeQueryMetadataChanges: true }, function(snapshot) {
                snapshot.docChanges.forEach(function(change) {
                    if (!snapshot.metadata.fromCache) {
                        if (listener) listener(change.type, change.doc.data());
                    }
                });
            });
          
            return Promise.resolve(entity);
        });
    }

    async fetchByDate(toFilter: string, listener: Function|null = null): Promise< ICart[] > {
        return await this.entity(listener)
            .then(transactions => {
                return transactions
                    .where('date', "==", toFilter)
                    .orderBy('time', 'desc')
                    .get()
                    .then(function(snapshots) {
                        const data = <any>[];
                        snapshots.forEach(doc => {
                            data.push(doc.data());
                        });
                        return Promise.resolve(data);
                    })
                    .catch((error: Error) => Promise.reject(error));
            });
    }

    async fetchByDateRange(fromFilter: number, toFilter: number, listener: Function|null = null): Promise< ICart[] > {
        return await this.entity(listener)
            .then(transactions => {
                return transactions
                    .where('time', ">=", fromFilter)
                    .where('time', "<=", toFilter)
                    .orderBy('time', 'desc')
                    // .orderBy('date', 'desc')
                    .get()
                    .then(function(snapshots) {
                        const data = <any>[];
                        snapshots.forEach(doc => {
                            data.push(doc.data());
                        });
                        return Promise.resolve(data);
                    })
                    .catch((error: Error) => Promise.reject(error));
            });
    }

    async listGroupedTransactionByRange(fromFilter: number, toFilter: number) {
        return this.fetchByDateRange(fromFilter, toFilter)
        .then(results => {
                let groupedData: Array<{
                    date: string,
                    qty: number,
                    total: number,
                    list: ICart[]
                }>=[];
                let summary = {
                    qty: 0,
                    total: 0
                }
                results.map(transaction => {
                    let data = groupedData.find(function(data) {
                        return data['date']==transaction.date;
                    });
                    if (!!data) {
                        data.qty += transaction.summary.qty;
                        data.total += transaction.summary.total;
                        data.list.push(transaction);
                    } else {
                        data = {
                            date: transaction.date, 
                            qty: transaction.summary.qty, 
                            total: transaction.summary.total,
                            list: [transaction]
                        }
                        groupedData.push(data);    
                    }
                    summary.qty += transaction.summary.qty; 
                    summary.total += transaction.summary.total; 
                });
                return Promise.resolve({data: groupedData, summary: summary});
            })
    }
}