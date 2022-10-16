import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs, doc, getDoc, addDoc, setDoc, updateDoc} from 'firebase/firestore/lite';
import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MESSAAGING_SENDER_ID} from 'react-native-dotenv';
import {toJS} from "mobx";

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "my-book-list-a44ff.firebaseapp.com",
    projectId: "my-book-list-a44ff",
    storageBucket: "my-book-list-a44ff.appspot.com",
    messagingSenderId: FIREBASE_MESSAAGING_SENDER_ID,
    appId: FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getBookListCount = async () => {
    const docRef = doc(db, 'quantities/1')
    const snap = await getDoc(docRef)
    // @ts-ignore
    return toJS(snap.data()).book
}

export {
    getBookListCount
}
