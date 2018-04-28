import Guid from '../../modules/guid';
export class CartService {
    constructor() {
        this.current = {
            id: '',
            items: [],
            summary: {
                total: 0,
                qty: 0
            }
        };
    }
    new() {
        this.current.id = Guid();
        this.current.items.length = 0;
        return this.current;
    }
    addItem(newItem) {
        let existing = this.current.items.filter(item => {
            if (item.plu == newItem.plu) {
                item.qty++;
                item.subtotal = item.qty * item.price;
                return item;
            }
            return null;
        });
        if (existing.length <= 0) {
            this.current.items.push({
                plu: newItem.plu,
                name: newItem.name,
                price: newItem.price,
                qty: 1,
                subtotal: 1 * newItem.price
            });
        }
        ;
        this.summarize();
        return this.current;
    }
    summarize() {
        this.current.summary = this.current.items.reduce((acc, curr) => {
            acc.qty += curr.qty;
            acc.total += curr.subtotal;
            return acc;
        }, { qty: 0, total: 0 });
    }
}
