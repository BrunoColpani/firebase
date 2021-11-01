import 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyD2eOU1gfSOMpEZV1ljV5H_AUaolQTspMY",
  authDomain: "cursoapp-9ab55.firebaseapp.com",
  projectId: "cursoapp-9ab55",
  storageBucket: "cursoapp-9ab55.appspot.com",
  messagingSenderId: "1083681505363",
  appId: "1:1083681505363:web:70b4238afa72b41b5c06a6",
  measurementId: "G-VSQEBNPRT5"
};


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;