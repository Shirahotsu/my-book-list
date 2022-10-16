import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, setDoc, updateDoc } from 'firebase/firestore/lite';
import {userStore} from "../store/user.store";
// @ts-ignore
import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MESSAAGING_SENDER_ID} from 'react-native-dotenv';
import {Profile} from "../models/Profile.model";
import {profileStore} from "../store/profile.store";
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

const emptyUserProfile:Profile = {
    userId:'',
    achievements:{
        books:{
          level:0,
          value:0
        },
        friends:{
          level:0,
          value:0
        },
        pages:{
          level:0,
          value:0
        },
        score:{
          level:0,
          value:0
        },
        streak:{
          level:0,
          value:0
        },
    },
    avatar: null,
    bookShelf:[],
    dailyReadPages:[],
    userName:'Nowy użytkownik',
    dayStreak: 0,
    level: 1,
}

const loadProfileDetails = async () => {
    // collection.
    // const test = await collection(app, )
    const userId = userStore.user.uid
    const docRef = doc(db, `profile/${userId}`);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data()
    if(data){
        const userProfile:Profile = {
            userId:data.userId,
            achievements:data.achievements,
            avatar: null,
            bookShelf:data.bookShelf,
            dailyReadPages:data.dailyReadPages,
            userName:data.userName,
            dayStreak: data.dayStreak,
            level: data.level,
        }
        profileStore.setProfile(userProfile)
    }
}

const createProfileDetails = async (newUserId:string|null = null) => {
    const userId = newUserId ?? userStore.user.uid
    const newUserProfile = {...emptyUserProfile, userId}
    await setDoc(doc(db, 'profile', userId), newUserProfile)
}

const updateUserName = async (userName:string) => {
    const userId = userStore.user.uid
    const docRef = doc(db, `profile/${userId}`);
    try {
        await updateDoc(docRef, {userName})
        profileStore.changeUserName(userName)
        return true;
    } catch (e){

    }
}


export {
    loadProfileDetails,
    updateUserName,
    createProfileDetails
}
