import { ProductService } from './domains/product/product.service';
declare const Poscore: () => {
    productService: ProductService;
};
export default Poscore;
