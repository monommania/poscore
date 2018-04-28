import fireStorage from './../../storage/firestorage';
import {IProductModel} from './product.model.interface';
import {IProduct} from './product.interface';

// this class must implement ProductModelInterface
export class ProductModelFirestore implements IProductModel {
    store: any;
    entity: any;
    storage: any;
    constructor(store: {id: string, name: string}) {
        this.storage = fireStorage();
        this.store = store;
        this.entity = this.storage.collection(store.id).doc('product').collection('list');
    }

    async all() {
        return await this.entity
            .get()
            .then(function(snapshots) {
                const data = <any>[];
                snapshots.forEach(doc => {
                    data.push(doc.data());
                });
                return Promise.resolve(data);
            })
            .catch((error: Error) => Promise.reject(error));
    }
    
    async add(newProduct: IProduct) {
        return await this.entity.doc(newProduct.plu).set(newProduct)
            .then(function() {
                return Promise.resolve(true)
            })
            .catch((error: Error) => Promise.reject(error))
    }

    async update(product: IProduct) {
        return await this.entity.get(product)
            .then(function() {
                return Promise.resolve(true)
            })
            .catch((error: Error) => Promise.reject(error))
    }

    async remove(plu: string) {
        return await true;
    }
}

