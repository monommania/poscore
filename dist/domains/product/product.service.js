var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ProductService {
    constructor(model) {
        this.model = model;
        this.list = [];
    }
    fetchAll(listener = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.all(listener)
                .then((result) => {
                this.list = result;
                return Promise.resolve(this.list);
            })
                .catch((error) => {
                return Promise.resolve(error);
            });
        });
    }
    findByPlu(plu) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.list.find((item) => {
                return item.plu === plu;
            });
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.list.filter((item) => {
                const toFind = name.toLowerCase();
                const existing = item.name.toLocaleLowerCase();
                return existing.match(/[toFind]/);
            });
        });
    }
}
