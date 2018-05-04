import fireStorage from './../../storage/firestorage';
import {IProductModel} from './product.model.interface';
import {IProduct} from './product.interface';
import {IStore} from '../store/store.interface';

// this class must implement ProductModelInterface
export class ProductModelFirestore implements IProductModel {
    connection: any;
    store: IStore;
    entityName = 'product';

    constructor(store: IStore) {
        this.connection = fireStorage;
        this.store = store;
    }

    async entity(listener: Function|null = null) {
        var listener = listener || null;
        return await this.connection.then(db => {
            let entity = db.collection(this.store.id)
                .doc(this.entityName)
                .collection('list');

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

    async all(listener: Function|null = null): Promise< IProduct[] > {
        return await this.entity(listener)
            .then(product => {
                return product
                    .orderBy('name')
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
    
    async add(newProduct: IProduct): Promise<Boolean> {
        return await this.entity()
            .then(product => {
                return product.doc(newProduct.plu).set(newProduct)
                    .then(function() {
                        return Promise.resolve(true)
                    })
                    .catch((error: Error) => Promise.reject(error))
            });
    }

    async update(product: IProduct): Promise<Boolean> {
        return await true;
    }

    async remove(plu: string): Promise<Boolean> {
        return await true;
    }
}

