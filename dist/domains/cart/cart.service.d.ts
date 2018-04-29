import { ICart, ICartItem } from './cart.interface';
import { ICartModel } from './cart.model.interface';
export declare class CartService {
    current: ICart;
    model: ICartModel;
    constructor(model: ICartModel);
    new(): ICart;
    addItem(newItem: ICartItem): ICart;
    removeItem(plu: string): ICart;
    summarize(): void;
    checkOut(): Promise<Boolean>;
}
