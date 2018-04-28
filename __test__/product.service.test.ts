import {ProductService} from '../src/domains/product/product.service';
import {ProductModelFirestore} from '../src/domains/product/product.model.firestore';
import { IProduct } from '../src/domains/product/product.interface';

const productModel = new ProductModelFirestore({id: "store-0000000", name: "Daily Coffee"})
const productService = new ProductService(productModel);

describe("Test Product Service", function() {
    test('assert fetch all data return desired value', async function() {
        const newProduct = <IProduct>{
            plu: "003",
            name: "Indomie",
            price: 1000,
            image: ""
        }
        await productService.model.add(newProduct);
        expect.assertions(1);
        let result = await productService.fetchAll();
        expect(result).toEqual(expect.arrayContaining([newProduct]));
    })
})