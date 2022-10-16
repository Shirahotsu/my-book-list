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
} from 'firebase/firestore/lite';
import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MESSAAGING_SENDER_ID} from 'react-native-dotenv';
import {Book} from "../models/Book";
import {bookListStore} from '../store/bookList'
import {getBookListCount} from './quantities'
import {toJS} from "mobx";
import {bookDetailsStore} from "../store/bookDetails";
import {profileStore} from "../store/profile";
import {Comment} from '../models/Book'

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

const addComment = async (commentMessage: string) => {
    const newComment: Comment = {
        released: {
            seconds: Math.round(Date.now() / 1000),
        },
        comment: commentMessage,
        userId: profileStore.profile.userId,
        userName: profileStore.profile.userName
    }
    const bookId = bookDetailsStore.bookDetails?.id
    // @ts-ignore
    const comments = [...bookDetailsStore.bookDetails?.comments, newComment]
    const docRef = doc(db, `book/${bookId}`);
    try {
        await updateDoc(docRef, {comments})
        bookDetailsStore.addComment(newComment)
        return true;
    } catch (e) {
        return false
    }
}

const loadFirst50SearchResults = async (queryText: string) => {
    const colRef = collection(db, 'book');
    const lowerCaseQueryText = queryText.toLocaleLowerCase()
    const q = query(colRef,
        where('searchTitle', '>=', lowerCaseQueryText),
        where('searchTitle', '<=', lowerCaseQueryText + '\uf8ff'),
        orderBy('searchTitle', 'desc'),
        limit(50)
    );
    const snapshot = await getDocs(q)
    const bookList: Book[] = []
    snapshot.forEach(doc => {
        bookList.push({...<Book>doc.data(), id: doc.id})
    })
    bookListStore.setLastVisibleDoc(snapshot.docs[snapshot.docs.length - 1])
    bookListStore.setBookList(bookList)
    console.log(bookListStore.bookListLength<=50)
    bookListStore.setLoadMoreBooks(!(bookListStore.bookListLength<=50))
}

const loadAdditional50SearchResults = async (queryText: string) => {
    const colRef = collection(db, 'book');
    const lowerCaseQueryText = queryText.toLocaleLowerCase()
    const q = query(colRef,
        where('searchTitle', '>=', lowerCaseQueryText),
        where('searchTitle', '<=', lowerCaseQueryText + '\uf8ff'),
        orderBy('searchTitle', 'desc'),
        startAfter(bookListStore.lastVisibleDoc),
        limit(50)
    );

    const snapshot = await getDocs(q)

    if(snapshot.docs.length <1){
        bookListStore.setLoadMoreBooks(false)
        return
    }

    const bookList: Book[] = []
    snapshot.forEach(doc => {
        bookList.push({...<Book>doc.data(), id: doc.id})
    })
    bookListStore.setLastVisibleDoc(snapshot.docs[snapshot.docs.length - 1])
    bookListStore.addToBookList(bookList)
}


export {
    loadFirst10Books,
    loadAdditional10Books,
    addComment,
    loadFirst50SearchResults,
    loadAdditional50SearchResults
}
