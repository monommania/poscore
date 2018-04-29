import {IProduct} from './product.interface';
import {IProductModel} from './product.model.interface';


export class ProductService {
    list: IProduct[];
    model: IProductModel;

    constructor(model: IProductModel) {
        this.model = model;
        this.list = [];    
    }   

    async fetchAll(listener: Function|null=null): Promise<IProduct[] | Error> {
        return await this.model.all(listener)
            .then((result: IProduct[]) => {
                this.list = result;
                return Promise.resolve(this.list);
            })
            .catch((error: Error) => {
                return Promise.resolve(error);
            });
    }

    async findByPlu(plu: string): Promise<IProduct|undefined> {
        return await this.list.find((item: IProduct) => {
            return item.plu===plu;
        })
    }

    async findByName(name: string): Promise<IProduct[]> {
        return await this.list.filter((item: IProduct) => {
            const toFind = name.toLowerCase();
            const existing = item.name.toLocaleLowerCase();
            return existing.match(/[toFind]/);
        })
    }
}
