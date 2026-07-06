export const roleRedirect = (role) => {
    switch (role) {
        case "admin":
        case "kasir":
        case "cashier":
            return "/admin/dashboard";

        case "owner":
            return "/owner/dashboard";

        case "barber":
            return "/barber/dashboard";

        case "member":
        case "customer":
            return "/member/dashboard";

        default:
            return "/";
    }
};