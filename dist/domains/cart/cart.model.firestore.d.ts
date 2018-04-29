import { ICartModel } from "./cart.model.interface";
import { ICart } from "./cart.interface";
import { IStore } from "../store/store.interface";
export declare class CartModelFirestore implements ICartModel {
    store: IStore;
    connection: any;
    entityName: string;
    constructor(store: IStore);
    entity(listener?: Function | null): Promise<any>;
    add(cart: ICart): Promise<Boolean>;
}
