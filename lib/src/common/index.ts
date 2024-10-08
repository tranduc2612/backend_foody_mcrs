import dayjs from "dayjs";

// dd/mm/yyyy -> date
export function convertStringToDate(dateString: string){
    if(!dateString) return undefined;

    const [day, month, year] = dateString.split("/");

    const validDate = dayjs(`${year}-${month}-${day}`,"yyyy-mm-dd");
    return validDate.toDate();
}

// date -> dd/mm/yyyy
export function convertDateToString(date: Date){
    if(!date) return undefined;

    const formattedDate = dayjs(date).format('DD/MM/YYYY');

    return formattedDate
}

export function getCurrentDateString(){
    const date = dayjs();
    const formattedDate = date.format('DD/MM/YYYY');

    return formattedDate
}


