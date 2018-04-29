import { ICart, ICartItem, ICartItems, ICartSummary } from './cart.interface';
import { ICartModel } from './cart.model.interface';

import Guid from '../../modules/guid';

export class CartService {
    current: ICart;
    model: ICartModel;

    constructor(model: ICartModel) {
        this.model = model;
        this.current = <ICart>{
            id: '',
            items: [],
            summary: {
                total: 0,
                qty: 0
            }
        };
    }
    
    new (): ICart {
        this.current.id = Guid();
        this.current.items.length = 0;
        return this.current;
    }
    
    addItem(newItem: ICartItem): ICart {
        let existing = this.current.items.find(item => item.plu===newItem.plu);
        if (existing) {
            existing.qty++;
            existing.subtotal = existing.qty*existing.price;            
        } else {
            this.current.items.push(
                {
                    plu: newItem.plu, 
                    name: newItem.name, 
                    price: newItem.price,
                    qty: newItem.qty, 
                    subtotal: newItem.qty * newItem.price
                }
            )
        }
        this.summarize();
        return this.current;
    }

    removeItem(plu: string): ICart {
        let existingIndex = this.current.items.map((item, index) => {
            if (item.plu===plu) {
                return index;
            }      
            return -1;      
        });
        if (existingIndex.length) this.current.items.splice(existingIndex[0], 1);
        this.summarize();
        return this.current;
    }

    summarize(): void {
        this.current.summary = this.current.items.reduce(
            (acc, curr) => {
                acc.qty += curr.qty;
                acc.total += (curr.subtotal || 0);
                return acc;
            }, 
            {qty: 0, total: 0}
        );
    }

    async checkOut(): Promise<Boolean> {
        return await this.model.add(this.current);
    }

}
