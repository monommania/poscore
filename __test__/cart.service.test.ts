import { CartService } from "../src/domains/cart/cart.service";
import { ICart, ICartItem } from "../src/domains/cart/cart.interface";
import {CartModelFirestore} from '../src/domains/cart/cart.model.firestore';

describe("test CartService", () => {

    const store = {
        id: "store-0000000",
        name: "Daily Coffeee"
    }

    const cartModel = new CartModelFirestore(store);
    const cartService = new CartService(cartModel);
    
    const newCart =  <ICart> {
        items: [],
        summary: {
            total: 0,
            qty: 0
        }
    };
    const newItem1 = <ICartItem> {
        plu: "001",
        name: "Test product 1",
        price: 15000,
        qty: 2
    }

    test('test connection', async () => {
        expect.assertions(1);
        const result = await cartModel.entity();
        expect(Boolean(result)).toBe(true);
    });

    it('assert new() will return empty Cart with ID value generated', () => {
        let result = cartService.new();
        expect(result).toMatchObject(newCart);
    });

    it('assert add first item will return current Cart containing the added item', () => {
        let result = cartService.addItem(newItem1);
        expect(result.items[0].subtotal).toBe(newItem1.qty*newItem1.price);
        expect(result.summary.qty).toBeGreaterThanOrEqual(newItem1.qty);
        expect(result.summary.total).toBeGreaterThanOrEqual(newItem1.qty*newItem1.price);
    });

    it('assert remove first item will delete item from Cart and update the Summary', () => {
        let result = cartService.removeItem("001");
        expect(result).not.toContainEqual(newItem1);
        expect(result.summary.qty).toBe(0);
        expect(result.summary.total).toBe(0);
    });
    
    const newItem2 = <ICartItem> {
        plu: "002",
        name: "Test product 2",
        price: 25000,
        qty: 3
    }

    it('assert add second item will return current Cart containing the added item', () => {
        let result = cartService.addItem(newItem2);
        expect(result.items[0].subtotal).toBe(newItem2.qty*newItem2.price);
        expect(result.summary.qty).toBeGreaterThanOrEqual(newItem2.qty);
        expect(result.summary.total).toBeGreaterThanOrEqual(newItem2.qty*newItem2.price);
    });

    it('assert checkout return success', async () => {
        expect.assertions(1);
        let result = await cartService.checkOut();
        expect(result).toBe(true);
    }); 
});