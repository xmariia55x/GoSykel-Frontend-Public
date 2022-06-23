import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "complete",
  authDomain: "complete",
  projectId: "complete",
  storageBucket: "complete",
  messagingSenderId: "complete",
  appId: "complete"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()
export {auth}