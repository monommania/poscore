import fireStorage from './../../storage/firestorage';
import { ICartModel } from "./cart.model.interface";
import { ICart } from "./cart.interface";
import { IStore } from "../store/store.interface";

export class CartModelFirestore implements ICartModel {

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

    async add(cart: ICart): Promise<Boolean> {
        return await this.entity()
            .then(transaction => {
                return transaction.doc(cart.id).set(cart)
                    .then(function() {
                        return Promise.resolve(true)
                    })
                    .catch((error: Error) => Promise.reject(error))
            });
    }
}