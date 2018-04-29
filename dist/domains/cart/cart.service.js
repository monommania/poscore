var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Guid from '../../modules/guid';
export class CartService {
    constructor(model) {
        this.model = model;
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
        newItem.qty = newItem.qty ? newItem.qty : 1;
        let existing = this.current.items.find(item => item.plu === newItem.plu);
        if (existing) {
            existing.qty++;
            existing.subtotal = existing.qty * existing.price;
        }
        else {
            this.current.items.push({
                plu: newItem.plu,
                name: newItem.name,
                price: newItem.price,
                qty: newItem.qty,
                subtotal: newItem.qty * newItem.price
            });
        }
        this.summarize();
        return this.current;
    }
    removeItem(plu) {
        let existingIndex = this.current.items.map((item, index) => {
            if (item.plu === plu) {
                return index;
            }
            return -1;
        });
        if (existingIndex.length)
            this.current.items.splice(existingIndex[0], 1);
        this.summarize();
        return this.current;
    }
    summarize() {
        this.current.summary = this.current.items.reduce((acc, curr) => {
            acc.qty += curr.qty;
            acc.total += (curr.subtotal || 0);
            return acc;
        }, { qty: 0, total: 0 });
    }
    checkOut() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.add(this.current);
        });
    }
}
