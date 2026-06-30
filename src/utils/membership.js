export function getTier(points) {

    if (points >= 2000)
        return "Platinum";

    if (points >= 1000)
        return "Gold";

    if (points >= 500)
        return "Silver";

    return "Bronze";

}

export function getDiscount(tier){

    switch(tier){

        case "Platinum":
            return 20;

        case "Gold":
            return 15;

        case "Silver":
            return 10;

        default:
            return 5;

    }

}