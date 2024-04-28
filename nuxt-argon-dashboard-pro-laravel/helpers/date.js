export const getDateNow = () => {
    let date = new Date(); 
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )) .toISOString() .split("T")[0];
}
