export const isAdmin = role => role === "admin";

export const isOwner = role => role === "owner";

export const isBarber = role => role === "barber";

export const isMember = role => role === "member";

export const canManageUsers = role =>

    ["admin"].includes(role);

export const canManageServices = role =>

    ["admin","owner"].includes(role);

export const canManageBookings = role =>

    ["admin","owner","barber"].includes(role);

export const canBooking = role =>

    ["member","guest"].includes(role);