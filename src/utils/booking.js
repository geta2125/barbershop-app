export function bookingColor(status){

    switch(status){

        case "Pending":
            return "bg-yellow-500";

        case "Confirmed":
            return "bg-blue-500";

        case "Completed":
            return "bg-green-500";

        case "Cancelled":
            return "bg-red-500";

        default:
            return "bg-gray-500";

    }

}

export function bookingBadge(status){

    switch(status){

        case "Pending":
            return "text-yellow-400";

        case "Confirmed":
            return "text-blue-400";

        case "Completed":
            return "text-green-400";

        case "Cancelled":
            return "text-red-400";

        default:
            return "text-gray-400";

    }

}