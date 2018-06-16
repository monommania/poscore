import { ICart } from "../cart/cart.interface";
import { IStore } from "../store/store.interface";
export declare class TransactionModelFirestore {
    store: IStore;
    connection: any;
    entityName: string;
    constructor(store: IStore);
    entity(listener?: Function | null): Promise<any>;
    fetchByDate(toFilter: string, listener?: Function | null): Promise<ICart[]>;
    fetchByDateRange(fromFilter: string, toFilter: string, listener?: Function | null): Promise<ICart[]>;
    listGroupedTransactionByRange(fromFilter: string, toFilter: string): Promise<{
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
