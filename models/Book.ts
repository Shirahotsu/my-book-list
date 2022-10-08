export interface Book {
    comments: Comment[]
    userRate: UserRate
    bookCover: string
    categories: string[]
    description: string
    title: string
}

export interface Comment {
    comment: string
    userId: string,
    userName: string
}

export interface UserRate {
    userId: string
    userScore: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}
