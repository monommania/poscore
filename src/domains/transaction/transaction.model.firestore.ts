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
            .then(product => {
                return product
                    .where('date', "==", toFilter)
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

    async fetchByDateRange(fromFilter: string, toFilter: string, listener: Function|null = null): Promise< ICart[] > {
        return await this.entity(listener)
            .then(product => {
                return product
                    .where('date', ">=", fromFilter)
                    .where('date', "<=", toFilter)
                    .orderBy('date', 'desc')
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
}