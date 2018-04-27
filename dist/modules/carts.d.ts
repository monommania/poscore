import { ICart, ICartItem } from '../interfaces/cart';
export declare class Carts {
    current: ICart;
    constructor();
    new(): ICart;
    addItem(newItem: ICartItem): ICart;
    summarize(): void;
}
