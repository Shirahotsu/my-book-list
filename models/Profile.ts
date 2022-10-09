export interface Profile {
    achievements: Achievements,
    bookShelf: Book[]
    dailyReadPages: DailyReadPages[]
    dayStreak: number
    level: number
    avatar: string | null,
    userId: string
    userName: string
}

export interface Achievements {
    books: BasicAchievement
    friends: FriendsAchievement
    pages: BasicAchievement
    score: BasicAchievement
    streak: BasicAchievement
}

export interface FriendsAchievement {
    level: 0 | 1 | 2 | 3 | 4 | 5,
    value: number
}

export interface BasicAchievement {
    level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    value: number
}

export interface Book {
    bookId: string,
    pagesRead: number,
    status: BookStatus
}

export interface DailyReadPages {
    date: Object,
    pages: Number
}

export enum BookStatus {
    PlanToRead = 0,
    Reading,
    Completed,
}
