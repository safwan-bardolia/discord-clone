import firebase from 'firebase';

// config from firebase-console
const firebaseConfig = {
    apiKey: "AIzaSyBiibJK2bKS2UEzSyd2KsT0IMO9XX-uPoI",
    authDomain: "discord-clone-d9352.firebaseapp.com",
    databaseURL: "https://discord-clone-d9352.firebaseio.com",
    projectId: "discord-clone-d9352",
    storageBucket: "discord-clone-d9352.appspot.com",
    messagingSenderId: "869179545442",
    appId: "1:869179545442:web:5b2d686d61b03786967e3b",
    measurementId: "G-CZF2EQB33C"
};

// initialize our app with firebase config  (connect our React app with firebase)
const firebaseApp = firebase.initializeApp(firebaseConfig);

// get access to the firebase-firestore DB
const db = firebaseApp.firestore();

// get the firebase auth (for signin/signout functionality )
const auth = firebase.auth();

// to tell firebase that we need google-auth service
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};     //name export
export default db;          //default export