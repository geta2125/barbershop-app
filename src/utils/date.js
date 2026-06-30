export function formatDate(date) {

    if (!date) return "-";

    return new Date(date).toLocaleDateString("id-ID", {

        day: "2-digit",

        month: "long",

        year: "numeric",

    });

}

export function formatTime(time) {

    if (!time) return "-";

    return time.substring(0,5);

}