import {BookStatus} from "./BookShelf.model";

export interface BookDetails {
    isInMyList: boolean,
    title: string,
    imgUrl?: string,
    myScore?:  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    pagesRead?: number,
    booksRead?: number,
    usersScore?: UserScore,
    releaseDate?: Date | string,
    categories?:string[],
    description?: string,
    status?: BookStatus,
}

export interface UserScore{
    score?: number,
    users?: number
}
