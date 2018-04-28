import { IProductModel } from './product.model.interface';
import { IProduct } from './product.interface';
export declare class ProductModelFirestore implements IProductModel {
    store: any;
    connection: any;
    constructor(store: {
        id: string;
        name: string;
    });
    entity(): Promise<any>;
    all(): Promise<IProduct[]>;
    add(newProduct: IProduct): Promise<Boolean>;
    update(product: IProduct): Promise<Boolean>;
    remove(plu: string): Promise<Boolean>;
}
