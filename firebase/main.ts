import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import firebase from "firebase/compat";
import {UserCredential, signOut, getIdToken } from 'firebase/auth'
import {getUserLoginError} from '../utils/responseErrors'
import {userStore} from "../store/user";
import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MESSAAGING_SENDER_ID} from 'react-native-dotenv';
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

const auth = getAuth(app);

onAuthStateChanged(auth, user => {
    // Check for user status
    if(user){
        const test = {
            accessToken: user.accessToken,
            uid: user.uid
        }
        userStore.setUser(test)
    } else {

    }
});

const login = async (email:string, password:string) => {
    try {
        const userCredential:UserCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log('userCredential',userCredential)

        return {success: true, value:userCredential}
    } catch (e) {
        // console.log(JSON.stringify(e))
        // console.log('ERRRORRRRR', e)
        return {success: false, value: getUserLoginError(e)}
    }

}

const register = async (email:string, password:string)=> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential)
}

const logOut = async () => {
    try {
        await signOut(auth)
        return true
    } catch (e) {
        return false
    }
}


export {
    login,
    register,
    logOut
}
