export interface IProduct {
    plu: string;
    name: string;
    price: number;
    image: string;
}
export interface ICartItem {
    plu: string;
    name: string;
    qty: number;
    price: number;
    subtotal: number;
}
export declare type ICartItems = ICartItem[];
export interface ICartSummary {
    total: number;
    qty: number;
}
export interface ICart {
    items: ICartItems;
    summary: ICartSummary;
}
