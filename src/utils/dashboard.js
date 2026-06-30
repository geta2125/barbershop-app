export function totalRevenue(transactions){

    return transactions.reduce(

        (sum,item)=>sum+item.final_amount,

        0

    );

}

export function totalBooking(bookings){

    return bookings.length;

}

export function totalCustomer(customers){

    return customers.length;

}