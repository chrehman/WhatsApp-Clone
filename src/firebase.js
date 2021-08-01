import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyCOWpHXQQVwlK-SVHLziitfAfOIIKFpmQE",
  authDomain: "whatsapp-clone-f99d3.firebaseapp.com",
  projectId: "whatsapp-clone-f99d3",
  storageBucket: "whatsapp-clone-f99d3.appspot.com",
  messagingSenderId: "365197573123",
  appId: "1:365197573123:web:d2aa8f1e7074d508192236"
};

const firebaseApp=firebase.initializeApp(firebaseConfig); 

const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;