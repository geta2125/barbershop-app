import { useAuth } from "@/contexts/auth-context";

import AdminSidebar from "./AdminSidebar";
import OwnerSidebar from "./OwnerSidebar";
import BarberSidebar from "./BarberSidebar";
import MemberSidebar from "./MemberSidebar";

export default function Sidebar(){

    const { profile } = useAuth();

    switch(profile?.role){

        case "admin":
            return <AdminSidebar/>;

        case "owner":
            return <OwnerSidebar/>;

        case "barber":
            return <BarberSidebar/>;

        case "member":
            return <MemberSidebar/>;

        default:
            return null;

    }

}