export interface ICartItem {
    plu: string,
    name: string,
    qty: number,
    price: number,
    subtotal: number
}

export type ICartItems = ICartItem[];

export interface ICartSummary {
    total: number,
    qty: number,
}

export interface ICart {
    items: ICartItems,
    summary: ICartSummary
}



