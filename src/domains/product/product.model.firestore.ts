import fireStorage from './../../storage/firestorage';
import {IProductModel} from './product.model.interface';
import {IProduct} from './product.interface';

// this class must implement ProductModelInterface
export class ProductModelFirestore implements IProductModel {
    store: any;
    connection: any;
    constructor(store: {id: string, name: string}) {
        this.connection = fireStorage();
        this.store = store;
    }

    async entity() {
        return await this.connection.then(db => {
            let entity = db.collection(this.store.id).doc('product').collection('list');
            return Promise.resolve(entity);
        })
    }

    async all(): Promise< IProduct[] > {
        return await this.entity()
            .then(product => {
                return product
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

