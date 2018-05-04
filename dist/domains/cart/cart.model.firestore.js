var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fireStorage from './../../storage/firestorage';
export class CartModelFirestore {
    constructor(store) {
        this.entityName = "transaction";
        this.store = store;
        this.connection = fireStorage;
    }
    entity(listener = null) {
        return __awaiter(this, void 0, void 0, function* () {
            listener = listener;
            return yield this.connection.then(db => {
                let entity = db.collection(this.store.id).doc(this.entityName).collection('list');
                entity.onSnapshot({ includeQueryMetadataChanges: true }, function (snapshot) {
                    snapshot.docChanges.forEach(function (change) {
                        if (!snapshot.metadata.fromCache) {
                            if (listener)
                                listener(change.type, change.doc.data());
                        }
                    });
                });
                return Promise.resolve(entity);
            });
        });
        var listener;
    }
    add(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.entity()
                .then(transaction => {
                return transaction.doc(cart.id).set(cart)
                    .then(function () {
                    return Promise.resolve(true);
                })
                    .catch((error) => Promise.reject(error));
            });
        });
    }
}
