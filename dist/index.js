import { ProductService } from './domains/product/product.service';
import { ProductModelFirestore } from './domains/product/product.model.firestore';
const Poscore = () => {
    const productModel = new ProductModelFirestore({
        id: "store-0000001",
        name: "Daily Coffee"
    });
    const productService = new ProductService(productModel);
    return {
        productService,
    };
};
export default Poscore;
