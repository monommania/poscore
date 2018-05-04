export interface ICartItem {
    plu: string,
    name: string,
    price: number,
    qty: number,
    subtotal?: number
}

export type ICartItems = ICartItem[];

export interface ICartSummary {
    total: number,
    qty: number,
}

export interface ICart {
    id: string,
    date: Date,
    items: ICartItems,
    summary: ICartSummary
}



