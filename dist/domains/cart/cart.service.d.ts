import { ICart, ICartItem } from './cart.interface';
export declare class CartService {
    current: ICart;
    constructor();
    new(): ICart;
    addItem(newItem: ICartItem): ICart;
    summarize(): void;
}
