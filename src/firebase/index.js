
import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8E_bGr44jfJFBBKn9-RJCCtspt8B_E-M",
    authDomain: "fir-react-image-uploads-ead75.firebaseapp.com",
    projectId: "fir-react-image-uploads-ead75",
    storageBucket: "fir-react-image-uploads-ead75.appspot.com",
    messagingSenderId: "917591921580",
    appId: "1:917591921580:web:b5bcf6e367a57c22472009",
    measurementId: "G-SBL1R34V4S"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };

