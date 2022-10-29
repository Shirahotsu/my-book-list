import {Achievements, BasicAchievement, FriendsAchievement} from "../models/Profile.model";
import {action, makeObservable, observable, toJS} from "mobx";
import {AchievementType, NewAchievementDialog} from "../models/Achievement.model";

const INITIAL_NEW_ACHIEVEMENT:NewAchievementDialog = {
    message: '',
    type: undefined,
    level: 0
}

class AchievementsStore {
    achievements: Achievements = {
        streak: {
            value: 0,
            level: 0
        },
        books: {
            value: 0,
            level: 0
        },
        friends: {
            value: 0,
            level: 0
        },
        pages: {
            value: 0,
            level: 0
        },
        score: {
            value: 0,
            level: 0
        },
    }

    newAchievementDialog:NewAchievementDialog = INITIAL_NEW_ACHIEVEMENT

    constructor() {
        makeObservable(this, {
            achievements: observable,
            newAchievementDialog: observable,
            setAchievements: action,
            updateAchievement: action,
            setNewAchievementDialog: action,
            clearNewAchievementDialog: action,
        })
    }

    setAchievements(achievements:Achievements){
        this.achievements = achievements
        console.log('this.achievements',toJS(this.achievements))
    }

    updateAchievement(type:AchievementType, achievement:BasicAchievement | FriendsAchievement){
        // @ts-ignore
        this.achievements[type] = achievement
    }

    setNewAchievementDialog(newAchievementDialog: NewAchievementDialog){
        this.newAchievementDialog = newAchievementDialog
    }

    clearNewAchievementDialog() {
        this.newAchievementDialog = INITIAL_NEW_ACHIEVEMENT
    }

}

export const achievementsStore = new AchievementsStore()
