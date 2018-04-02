import firebase from "firebase";
import Rebase from "re-base";
import secret from "../sensitive.json";


const config = {
	apiKey: secret.apiKey,
	authDomain: secret.authDomain,
	databaseURL: secret.databaseURL,
	projectId: secret.projectId,
	storageBucket: secret.storageBucket,
	messagingSenderId: secret.messagingSenderId
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const firebaseDB = app.database();

export { app, base, facebookProvider, firebaseDB };
