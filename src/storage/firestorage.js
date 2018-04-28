const fireStorage = function() {
    const firebase = require("firebase");
    // Required for side-effects
    require("firebase/firestore");
    
    const config = {
        apiKey: "AIzaSyB0bT4f4rGMwgYO5VMIcBgArlAM2FJutvM",
        authDomain: "monommania-9e2fb.firebaseapp.com",
        projectId: "monommania-9e2fb",
    };
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    
    // Initialize Cloud Firestore through Firebase
    firebase.initializeApp(config);
    let firestore = firebase.firestore();
    firestore.settings(settings);
    // firestore =  await firestore.enablePersistence();
    return firestore;
}

module.exports = fireStorage;