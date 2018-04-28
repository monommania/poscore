import { IProduct } from './product.interface';
import { IProductModel } from './product.model.interface';
export declare class ProductService {
    list: IProduct[];
    model: IProductModel;
    constructor(model: IProductModel);
    fetchAll(): Promise<void>;
    findByPlu(plu: string): Promise<IProduct | undefined>;
    findByName(name: string): Promise<IProduct[]>;
}