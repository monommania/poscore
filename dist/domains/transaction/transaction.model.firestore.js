var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fireStorage from './../../storage/firestorage';
export class TransactionModelFirestore {
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
    fetchByDate(toFilter, listener = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.entity(listener)
                .then(product => {
                return product
                    .where('date', "==", toFilter)
                    .orderBy('time', 'desc')
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
    fetchByDateRange(fromFilter, toFilter, listener = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.entity(listener)
                .then(product => {
                return product
                    .where('date', ">=", fromFilter)
                    .where('date', "<=", toFilter)
                    .orderBy('date', 'desc')
                    .orderBy('time', 'desc')
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
}
