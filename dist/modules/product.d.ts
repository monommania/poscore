import { IProduct } from '../interfaces/product';
import { IStorage } from '../interfaces/storage';
export declare class Product {
    list: IProduct[];
    db: IStorage;
    constructor(db: IStorage);
    fetchAll(): Promise<void>;
    findByPlu(plu: string): Promise<IProduct | undefined>;
    findByName(name: string): Promise<IProduct[]>;
}
