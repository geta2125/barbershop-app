export function capitalize(text = "") {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function truncate(text = "", length = 50) {
    if (text.length <= length) return text;

    return text.substring(0, length) + "...";
}

export function generateBookingCode() {
    return (
        "BK-" +
        Date.now().toString().slice(-8)
    );
}