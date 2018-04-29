export interface ICartItem {
    plu: string;
    name: string;
    price: number;
    qty: number;
    subtotal?: number;
}
export declare type ICartItems = ICartItem[];
export interface ICartSummary {
    total: number;
    qty: number;
}
export interface ICart {
    id: string;
    items: ICartItems;
    summary: ICartSummary;
}
