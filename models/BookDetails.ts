export default interface BookDetails {
    isInMyList: boolean,
    title: string,
    imgUrl?: string,
    myScore?: number,
    pagesRead?: number,
    booksRead?: number,
    usersScore?: UserScore,
    releaseDate?: Date | string,
    categories?:string[],
    description?: string
}

interface UserScore{
    score?: number,
    users?: number
}
