export function getDateString(date: Date) {
    const datePart = date.getDate();
    const monthPart = date.getMonth()+1;
    const yearPart = date.getFullYear();
    return yearPart + "-" + monthPart + "-" + datePart
}

export function getDateNow() {
    const now = (new Date());
    return getDateString(now);
}

export function getTimeNow() {
    return (new Date()).getTime();
}