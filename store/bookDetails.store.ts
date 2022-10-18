import {action, computed, makeObservable, observable} from "mobx";
import {Book} from "../models/Book.model";
import {BookStatus} from "../models/BookShelf.model";

class BookDetailsStore {
    bookDetails: Book | null = null
    isInBookshelfView: boolean = false

    constructor() {
        makeObservable(this, {
            bookDetails: observable,
            setBookDetails: action,
            setIsInBookshelfView: action,
            addComment: action,
            updateMyScore: action,
            updatePagesRead: action,
            updateStatus: action,
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

    updateMyScore(myScore: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | undefined){
        if(!this.bookDetails) return
        this.bookDetails.myScore = myScore
    }
    updatePagesRead(pagesRead: number){
        if(!this.bookDetails) return
        this.bookDetails.pagesRead = pagesRead
    }
    updateStatus(status: BookStatus){
        if(!this.bookDetails) return
        this.bookDetails.status = status
    }
}

export const bookDetailsStore = new BookDetailsStore()
