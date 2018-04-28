import { IProduct } from './product.interface';
export interface all {
    (): Promise<Array<IProduct>>;
}
export interface add {
    (newProduct: IProduct): Promise<IProduct>;
}
export interface update {
    (product: IProduct): Promise<IProduct>;
}
export interface remove {
    (plu: string): Promise<Boolean>;
}
export interface IProductModel {
    all: all;
    add: add;
    update: update;
    remove: remove;
}
