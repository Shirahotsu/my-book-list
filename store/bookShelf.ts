import {BookShelfItem} from "../models/BookShelf";
import {action, makeObservable, observable} from "mobx";

class BookShelf {
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


export const bookShelfStore = new BookShelf()
