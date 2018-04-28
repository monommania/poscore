const fireStorage = function() {
    const firebase = require("firebase");
    // Required for side-effects
    require("firebase/firestore");
    
    const config = {
        apiKey: "AIzaSyB0bT4f4rGMwgYO5VMIcBgArlAM2FJutvM",
        authDomain: "monommania-9e2fb.firebaseapp.com",
        projectId: "monommania-9e2fb",
    };

    // Initialize Cloud Firestore through Firebase
    firebase.initializeApp(config);
    firestore =  firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);
    return firestore;
}

module.exports = fireStorage;