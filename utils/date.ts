const convertDateToDashedDate = (date): string => {
    return date.toISOString().replace(/T.*/, '').split('-').join('-')
}

const convertSecondsToDate = (seconds:number): Date =>{
    return new Date(seconds * 1000);
}
 export {
     convertDateToDashedDate,
     convertSecondsToDate
 }
