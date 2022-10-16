import {Book} from "./Book.model";

export interface BookShelfItem extends Book {
    pagesRead: number,
    status: BookStatus,
    myScore: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
}

export enum BookStatus {
    PlanToRead = 0,
    Reading,
    Completed,
}
