import {ProductService} from '../src/domains/product/product.service';
import {ProductModelFirestore} from '../src/domains/product/product.model.firestore';
import { IProduct } from '../src/domains/product/product.interface';


describe("Test Product Service", function() {
    const productModel = new ProductModelFirestore({id: "store-0000000", name: "Daily Coffee"})
    const productService = new ProductService(productModel);
    
    const newProduct = <IProduct>{
        plu: "0003",
        name: "Indomie",
        price: 1000,
        image: ""
    }

    test('assert fetch all data return desired value', async function() {
        await productService.model.add(newProduct);
        expect.assertions(1);
        let result = await productService.fetchAll();
        expect(result).toEqual(expect.arrayContaining([newProduct]));
    });

    test('assert findByPlu return correct value', async () => {
        expect.assertions(1);
        let result =  await productService.findByPlu(newProduct.plu);
        expect(result).toEqual(newProduct);
    });

    test('assert findByName return relevant product', async () => {
        expect.assertions(1);
        let result = await productService.findByName(newProduct.name);
        expect(result).toEqual(expect.arrayContaining([newProduct]));
    })
});