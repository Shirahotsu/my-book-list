import {action, computed, makeObservable, observable} from "mobx";
import {Profile as ProfileInterface, DailyReadPages} from '../models/Profile.model'
import {BookShelfItem} from "../models/BookShelf.model";

const emptyUserProfile:ProfileInterface = {
    userId:'',
    achievements:{
        books:{
            level:0,
            value:0
        },
        friends:{
            level:0,
            value:0
        },
        pages:{
            level:0,
            value:0
        },
        score:{
            level:0,
            value:0
        },
        streak:{
            level:0,
            value:0
        },
    },
    avatar: null,
    bookShelf:[],
    dailyReadPages:[],
    userName:'Nowy użytkownik',
    dayStreak: 0,
    level: 1,
}

export class ProfileStore {
    profile: ProfileInterface = emptyUserProfile

    constructor() {
        makeObservable(this,{
            profile:observable,
            setProfile: action,
            changeUserName: action,
            updateProfileBookshelf:action,
            dailyReadPages: computed,
            bookshelfBooksIds: computed
        })
    }

    get dailyReadPages():DailyReadPages[]{
        return this.profile.dailyReadPages
    }

    get bookshelfBooksIds ():string[] {
        return this.profile.bookShelf.map(book=>book.id)
    }

    setProfile(newProfile:ProfileInterface){
        this.profile = newProfile
    }

    changeUserName(newUserName:string){
        this.profile.userName = newUserName
    }

    updateProfileBookshelf(newBookshelf: BookShelfItem[]){
        this.profile.bookShelf = newBookshelf
    }

}

export const profileStore = new ProfileStore()
