import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usersAPI } from "../../services/usersAPI";

export default function Logout() {

    const navigate = useNavigate();

    useEffect(() => {
        usersAPI.logout().finally(() => {
            localStorage.removeItem("user");
            navigate("/login", { replace: true });
        });
    }, [navigate]);

    return null;
}
