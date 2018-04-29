import { IProductModel } from './product.model.interface';
import { IProduct } from './product.interface';
import { IStore } from '../store/store.interface';
export declare class ProductModelFirestore implements IProductModel {
    connection: any;
    store: IStore;
    entityName: string;
    constructor(store: IStore);
    entity(listener?: Function | null): Promise<any>;
    all(listener?: Function | null): Promise<IProduct[]>;
    add(newProduct: IProduct): Promise<Boolean>;
    update(product: IProduct): Promise<Boolean>;
    remove(plu: string): Promise<Boolean>;
}
