export const roleRedirect = (role) => {
    switch (role) {
        case "admin":
            return "/admin/dashboard";

        case "owner":
            return "/owner/dashboard";

        case "barber":
            return "/barber/dashboard";

        case "member":
            return "/member/dashboard";

        default:
            return "/";
    }
};