import { ICart } from "../cart/cart.interface";
import { IStore } from "../store/store.interface";
export declare class TransactionModelFirestore {
    store: IStore;
    connection: any;
    entityName: string;
    constructor(store: IStore);
    entity(listener?: Function | null): Promise<any>;
    fetchByDate(toFilter: string, listener?: Function | null): Promise<ICart[]>;
    fetchByDateRange(fromFilter: number, toFilter: number, listener?: Function | null): Promise<ICart[]>;
    listGroupedTransactionByRange(fromFilter: number, toFilter: number): Promise<{
        data: {
            date: string;
            qty: number;
            total: number;
            list: ICart[];
        }[];
        summary: {
            qty: number;
            total: number;
        };
    }>;
}
