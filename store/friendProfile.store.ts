import {action, computed, makeObservable, observable} from "mobx";
import {BookshelfItem, FriendProfileModel} from "../models/FriendProfile.model";

class FriendProfileStore {
    profile: FriendProfileModel | null = null
    bookshelf: BookshelfItem[] = []

    constructor() {
        makeObservable(this, {
            profile: observable,
            bookshelf: observable,
            setProfile: action,
            bookshelfBooksIds: computed
        })
    }

    setProfile(profile:FriendProfileModel){
        this.profile = profile
    }
    setBookshelf(bookshelf:BookshelfItem[]){
        this.bookshelf = bookshelf
    }
    get bookshelfBooksIds(): string[] {
        return this.profile?.bookShelf.map(book => book.id) || []
    }
}

export const friendProfileStore = new FriendProfileStore()
