export class Firestorage {
    constructor() {
        const firebase = require("firebase");
        // Required for side-effects
        require("firebase/firestore");
        
        const config = {
            apiKey: "AIzaSyB0bT4f4rGMwgYO5VMIcBgArlAM2FJutvM",
            authDomain: "monommania-9e2fb.firebaseapp.com",
            projectId: "monommania-9e2fb",
        };
        firebase.initializeApp(config);
        // Initialize Cloud Firestore through Firebase
        this.db = firebase.firestore();
    }
}