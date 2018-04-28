// this class must implement ProductModelInterface
class ProductModelFirestore {
    constructor(store) {
        const firestorage = require('../../storage/firestorage');
        this.storage = new firestorage();
        this.store = store
        this.entity = this.storage.collection(store.id).doc('products');
    }

    async all() {
        return await this.entity.get()
    }
    
    async add(newProduct) {
        return await this.entity.set(newProduct)
    }
}