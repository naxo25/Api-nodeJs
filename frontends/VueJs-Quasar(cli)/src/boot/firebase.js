// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
//import { Quasar, QUploader} from 'quasar'

// PUT YOUR OWN FIREBASE CONFIGURATION HERE
var firebaseConfig = {
	//
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()
let storageRef = firebase.storage().ref();

export { firebaseAuth, firebaseDb }