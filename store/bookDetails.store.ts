import {action, computed, makeObservable, observable} from "mobx";
import {Book} from "../models/Book.model";

class BookDetailsStore {
    bookDetails: Book | null = null
    isInBookshelfView: boolean = false

    constructor() {
        makeObservable(this, {
            bookDetails: observable,
            setBookDetails: action,
            setIsInBookshelfView: action,
            addComment: action
        })
    }

    setBookDetails(bookDetails: Book) {
        this.bookDetails = bookDetails
    }

    setIsInBookshelfView(isInBookshelfView: boolean){
        this.isInBookshelfView = isInBookshelfView
    }

    addComment(comment: any){
        this.bookDetails?.comments.push(comment)
    }
}

export const bookDetailsStore = new BookDetailsStore()
