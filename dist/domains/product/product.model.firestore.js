var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fireStorage from './../../storage/firestorage';
export class ProductModelFirestore {
    constructor(store) {
        this.connection = fireStorage();
        this.store = store;
    }
    entity() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.connection.then(db => {
                let entity = db.collection(this.store.id).doc('product').collection('list');
                return Promise.resolve(entity);
            });
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.entity()
                .then(product => {
                return product
                    .get()
                    .then(function (snapshots) {
                    const data = [];
                    snapshots.forEach(doc => {
                        data.push(doc.data());
                    });
                    return Promise.resolve(data);
                })
                    .catch((error) => Promise.reject(error));
            });
        });
    }
    add(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.entity()
                .then(product => {
                return product.doc(newProduct.plu).set(newProduct)
                    .then(function () {
                    return Promise.resolve(true);
                })
                    .catch((error) => Promise.reject(error));
            });
        });
    }
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield true;
        });
    }
    remove(plu) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield true;
        });
    }
}
