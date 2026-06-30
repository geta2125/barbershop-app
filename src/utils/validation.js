export function validateEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

export function validatePhone(phone){

    return /^08[0-9]{8,13}$/.test(phone);

}

export function validatePassword(password){

    return password.length >= 6;

}