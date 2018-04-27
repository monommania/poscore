var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Products {
    constructor(db) {
        this.db = db;
        this.list = [];
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.loadProductList()
                .then(function (result) {
                this.list = result;
            });
        });
    }
    findByPlu(plu) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.list.find(function (item) {
                return item.plu === plu;
            });
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.list.filter(function (item) {
                return item.name.toLowerCase().match(/name.toLowerCase()/);
            });
        });
    }
}
