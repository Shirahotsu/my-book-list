import {BookShelfItem} from "../models/BookShelf.model";
import {action, makeObservable, observable} from "mobx";

class BookShelfStore {
    bookShelf: BookShelfItem[] = []

    constructor() {
        makeObservable(this, {
            bookShelf:observable,
            setBookShelf: action
        })
    }

    setBookShelf(bookShelf: BookShelfItem[]) {
        this.bookShelf = bookShelf
    }

    loadBookShelf(){

    }
}


export const bookShelfStore = new BookShelfStore()
