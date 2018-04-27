import {ICartItem, ICartItems, ICartSummary, ICart} from '../interfaces/cart';
import {IProduct} from '../interfaces/product';
import {IStorage} from '../interfaces/storage';


class Product {
    list: IProduct[];
    db: IStorage;

    constructor(db: IStorage) {
        this.db = db;
        this.list = [];    
    }   

    async fetchAll(): Promise<void> {
        await this.db.loadProductList()
            .then(function(this: Product, result: IProduct[]) {
                this.list = result;
            });
    }

    async findByPlu(plu: string): Promise<IProduct|undefined> {
        return await this.list.find(function(this: Product, item: IProduct) {
            return item.plu===plu;
        })
    }

    async findByName(name: string): Promise<IProduct[]> {
        return await this.list.filter(function(this: Product, item: IProduct) {
            return item.name.toLowerCase().match(/name.toLowerCase()/);
        })
    }
}
