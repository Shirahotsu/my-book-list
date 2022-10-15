import {initializeApp} from "firebase/app";
import {getFirestore, collection, query, orderBy, limit, getDocs, startAfter} from 'firebase/firestore/lite';
import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MESSAAGING_SENDER_ID} from 'react-native-dotenv';
import {Book} from "../models/Book";
import {bookListStore} from '../store/bookList'
import {getBookListCount} from './quantities'
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

const loadFirst10Books = async () => {
    const {sortBy, direction} = bookListStore.sortOption
    const colRef = collection(db, 'book');
    const q = query(colRef, orderBy(sortBy, direction), limit(10));
    const snapshot = await getDocs(q)
    const bookList: Book[] = []
    snapshot.forEach(doc => {
        bookList.push({...<Book>doc.data(), id: doc.id})
    })
    bookListStore.setLastVisibleDoc(snapshot.docs[snapshot.docs.length - 1])
    bookListStore.setBookList(bookList)
    bookListStore.setLoadMoreBooks(true)
}

const loadAdditional10Books = async () => {
    const {sortBy, direction} = bookListStore.sortOption
    const count = await getBookListCount()
    const colRef = collection(db, 'book');
    const q = query(colRef, orderBy(sortBy, direction), startAfter(bookListStore.lastVisibleDoc), limit(1));
    const snapshot = await getDocs(q)
    const bookList: Book[] = []
    snapshot.forEach(doc => {
        bookList.push({...<Book>doc.data(), id: doc.id})
    })
    console.log('lastVis', (snapshot.docs[snapshot.docs.length - 1]))
    bookListStore.addToBookList(bookList)
    bookListStore.setLastVisibleDoc(snapshot.docs[snapshot.docs.length - 1])
    if (bookListStore.bookListLength >= count) {
        bookListStore.setLoadMoreBooks(false)
    }
}


export {
    loadFirst10Books,
    loadAdditional10Books
}
