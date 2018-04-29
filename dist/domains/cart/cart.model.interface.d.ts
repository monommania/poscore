import { ICart } from './cart.interface';
export interface all {
    (listener: Function | null): Promise<Array<ICart>>;
}
export interface add {
    (newCart: ICart): Promise<Boolean>;
}
export interface update {
    (cart: ICart): Promise<Boolean>;
}
export interface remove {
    (plu: string): Promise<Boolean>;
}
export interface ICartModel {
    all?: all;
    add: add;
    update?: update;
    remove?: remove;
}
