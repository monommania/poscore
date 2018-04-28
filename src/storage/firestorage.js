const { detect } = require('detect-browser');
const browser = detect();
 
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
    
    if (browser) {
        firebase.firestore().settings(settings);
        firebase.firestore().enablePersistence()
            .then(function() {
                let firestore = firebase.firestore();
                return Promise.resolve(firestore);
            })
            .catch(error => {
                let firestore = firebase.firestore();
                return Promise.resolve(firestore);
            })
    } else {
        let firestore = firebase.firestore();
        firestore.settings(settings);
        return Promise.resolve(firestore);
    }
}

module.exports = fireStorage;