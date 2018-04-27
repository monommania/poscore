import {IProduct}  from  './product';

export interface loadProductList {
    (): Promise< Array<IProduct> >;
}

export interface findByPlu {
    (): Promise< IProduct >;
}

export interface findByName {
    (): Promise< IProduct[] >;
}

export interface IStorage {
    loadProductList: loadProductList,
    findByPlu: findByPlu,
    findByName: findByName
}