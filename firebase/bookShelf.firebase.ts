import {initializeApp} from "firebase/app";
import {
    getFirestore,
    collection,
    query,
    orderBy,
    limit,
    getDocs,
    startAfter,
    doc,
    updateDoc,
    where,
    FieldPath,
    documentId
} from 'firebase/firestore/lite';
import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MESSAAGING_SENDER_ID} from 'react-native-dotenv';
import {Book} from "../models/Book.model";
import {bookListStore} from '../store/bookList.store'
import {getBookListCount} from './quantities.firebase'
import {toJS} from "mobx";
import {bookDetailsStore} from "../store/bookDetails.store";
import {profileStore} from "../store/profile.store";
import {Comment} from '../models/Book.model'
import {bookShelfStore} from "../store/bookShelf.store";

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

const loadBooksInMyBookshelf = async () => {
    const bookshelfBooksIds = profileStore.bookshelfBooksIds
    const bookshelfBookDetails = {}
    profileStore.profile.bookShelf.forEach(book => {
        Object.assign(bookshelfBookDetails, {
            [book.bookId]: {
                pagesRead: book.pagesRead,
                status: book.status,
                myScore: book.myScore
            }
        })
    })
    const colRef = collection(db, 'book');
    const q = query(colRef, where('id', 'in', bookshelfBooksIds));
    const snapshot = await getDocs(q)
    const bookShelf = []
    snapshot.forEach(doc => {
        bookShelf.push({...<Book>doc.data(), ...bookshelfBookDetails[doc.id]})
    })
    bookShelfStore.setBookShelf(bookShelf)
}

export {
    loadBooksInMyBookshelf
}
