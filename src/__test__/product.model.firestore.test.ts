import {ProductService}  from '../domains/product/product.service';
import  {ProductModelFirestore} from '../domains/product/product.model.firestore';


const store = {
    name: "Daily Coffe",
    id: "store-0000000"
}

const model = new ProductModelFirestore(store)

const newProduct1 = {
    plu: "0001",
    name: "Mochachino",
    price: 15000,
    image: ""
}
const newProduct2 = {
    plu: "0002",
    name: "Choco Mochachino",
    price: 16000,
    image: ""
}
describe("testing firestore model functionality", function() {
    test('test connection', async () => {
        expect.assertions(1);
        const result = await model.entity();
        expect(Boolean(result)).toBe(true);
    });

    test('assert add first data and return success', async () => {
        expect.assertions(1);
        const result = await model.add(newProduct1);
        expect(result).toBe(true);
    });

    test('assert add second data and return success', async () => {
        expect.assertions(1);
        const result = await model.add(newProduct2);
        expect(result).toBe(true);
    });
    
    test('assert get added data from firestore server', async () => {
        expect.assertions(1);
        const result = await model.all();
        expect(result).toEqual([newProduct1, newProduct2]);
    });
});


