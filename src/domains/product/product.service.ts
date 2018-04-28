import {IProduct} from './product.interface';
import {IProductModel} from './product.model.interface';


export class ProductService {
    list: IProduct[];
    model: IProductModel;

    constructor(model: IProductModel) {
        this.model = model;
        this.list = [];    
    }   

    async fetchAll(): Promise<IProduct[]> {
        return await this.model.all()
            .then((result: IProduct[]) => {
                this.list = result;
                return Promise.resolve(this.list);
            });
    }

    async findByPlu(plu: string): Promise<IProduct|undefined> {
        return await this.list.find(function(this: ProductService, item: IProduct) {
            return item.plu===plu;
        })
    }

    async findByName(name: string): Promise<IProduct[]> {
        return await this.list.filter(function(this: ProductService, item: IProduct) {
            return item.name.toLowerCase().match(/name.toLowerCase()/);
        })
    }
}
