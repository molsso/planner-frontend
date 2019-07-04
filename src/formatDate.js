export default function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day} ${monthNames[monthIndex]} ${year}, ${hours}:${minutes}`;
}