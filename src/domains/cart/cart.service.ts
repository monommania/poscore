import { ICart, ICartItem, ICartItems, ICartSummary } from './cart.interface';
import { ICartModel } from './cart.model.interface';

import Guid from '../../modules/guid';
import { getDateString, getDateNow, getTimeNow } from '../../modules/datetime';

export class CartService {
    current: ICart;
    model: ICartModel;

    constructor(model: ICartModel) {
        this.model = model;
        this.current = <ICart>{
            id: '',
            date: getDateNow(),
            time: getTimeNow(),
            items: [],
            summary: {
                total: 0,
                qty: 0
            }
        };
    }
    
    new (): ICart {
        this.current.id = Guid();
        this.current.date = getDateNow();
        this.current.time = getTimeNow();
        this.current.items.length = 0;
        this.current.summary.qty = 0;
        this.current.summary.total = 0;
        return this.current;
    }
    
    addItem(newItem: ICartItem): ICart {
        newItem.qty = newItem.qty ? newItem.qty : 1;
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
        let transaction = JSON.parse(JSON.stringify(this.current));            
        return await this.model.add(transaction)
            .then(result => Promise.resolve(result))
            .catch(error => Promise.reject(error));
    }

}
