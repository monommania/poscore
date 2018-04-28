import {IProduct}  from  './product.interface';

export interface all {
    (): Promise< Array<IProduct> >;
}

export interface add {
    (newProduct: IProduct): Promise< Boolean >;
}

export interface update {
    (product: IProduct): Promise< Boolean >;
}

export interface remove {
    (plu: string): Promise< Boolean >;
}

export interface IProductModel {
    all: all,
    add: add,
    update: update,
    remove: remove
}