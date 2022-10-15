import {Book} from "../models/Book";
import {action, computed, makeObservable, observable} from "mobx";

class BookList {
    bookList: Book[] = []
    lastVisibleDoc: any = null
    loadMoreBooks: boolean = true

    constructor() {
        makeObservable(this, {
            lastVisibleDoc: observable,
            bookList: observable,
            loadMoreBooks: observable,
            setBookList: action,
            addToBookList: action,
            setLoadMoreBooks: action,
            bookListLength: computed,
            lastBook: computed
        })
    }

    setBookList(bookList: Book[]) {
        this.bookList = bookList
    }

    setLastVisibleDoc(doc: any) {
        this.lastVisibleDoc = doc
    }

    setLoadMoreBooks(loadMoreBooks: boolean) {
        this.loadMoreBooks = loadMoreBooks
    }

    addToBookList(bookList: Book[]) {
        this.bookList?.push(...bookList)
    }

    get bookListLength() {
        return this.bookList.length
    }

    get lastBook() {
        return this.bookList[this.bookList.length - 1]
    }

}

export const bookListStore = new BookList()
