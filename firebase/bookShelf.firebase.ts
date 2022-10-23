import {initializeApp} from "firebase/app";
import {collection, doc, getDocs, getFirestore, query, updateDoc, where} from 'firebase/firestore/lite';
// @ts-ignore
import {FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MESSAAGING_SENDER_ID} from 'react-native-dotenv';
import {Book, Score} from "../models/Book.model";
import {bookDetailsStore} from "../store/bookDetails.store";
import {profileStore} from "../store/profile.store";
import {bookShelfStore} from "../store/bookShelf.store";
import {BookStatus} from "../models/BookShelf.model";
import {userStore} from "../store/user.store";
import {firebaseConfig} from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loadBooksInMyBookshelf = async () => {
    const bookshelfBooksIds = profileStore.bookshelfBooksIds
    if (bookshelfBooksIds.length < 1) {
        return
    }
    const bookshelfBookDetails = {}
    profileStore.profile.bookShelf.forEach(book => {
        Object.assign(bookshelfBookDetails, {
            [book.id]: {
                pagesRead: book.pagesRead,
                status: book.status,
                myScore: book.myScore,
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

const changeBookStatus = async (bookId: string, status: BookStatus) => {
    const userId = userStore.user.uid
    const newBookshelf = [...bookShelfStore.bookShelf].map(book => {
        if (book.id === bookId) {
            book.status = status
        }
        return book
    })
    const docRef = doc(db, `profile/${userId}`);
    try {
        await updateDoc(docRef, {bookShelf: newBookshelf})
        bookDetailsStore.updateStatus(status)
        profileStore.updateProfileBookshelf(newBookshelf)
        return true;
    } catch (e) {
        return false
    }
}

const changeBookScore = async (bookId: string, score: Score) => {
    const userId = userStore.user.uid
    const newBookshelf = [...bookShelfStore.bookShelf].map(book => {
        if (book.id === bookId) {
            book.myScore = score
        }
        return book
    })
    const docRef = doc(db, `profile/${userId}`);
    try {
        await updateDoc(docRef, {bookShelf: newBookshelf})
        bookDetailsStore.updateMyScore(score)
        profileStore.updateProfileBookshelf(newBookshelf)
        return true;
    } catch (e) {
        return false
    }
}

const changeBookPagesRead = async (bookId:string, pagesRead:number) =>{
    const userId = userStore.user.uid
    const newBookshelf = [...bookShelfStore.bookShelf].map(book => {
        if (book.id === bookId) {
            book.pagesRead = pagesRead
        }
        return book
    })
    const docRef = doc(db, `profile/${userId}`);
    try {
        await updateDoc(docRef, {bookShelf: newBookshelf})
        bookDetailsStore.updatePagesRead(pagesRead)
        profileStore.updateProfileBookshelf(newBookshelf)
        return true;
    } catch (e) {
        return false
    }
}

export {
    loadBooksInMyBookshelf,
    changeBookStatus,
    changeBookScore,
    changeBookPagesRead
}
