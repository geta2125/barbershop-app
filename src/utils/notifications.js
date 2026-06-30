export function success(message){

    return{

        status:"success",

        message,

    };

}

export function error(message){

    return{

        status:"error",

        message,

    };

}