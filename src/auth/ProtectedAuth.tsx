import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const ProtectedAuthAdmin = ({ children }: { children: JSX.Element }) => {
    const token = Cookies.get("token");

    if (!token) return <Navigate to="/login"/>

    axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (response.data.data.role !== "admin") return <Navigate to="/"/>
    }).catch((error) => {
        console.log(error);
    });
    
    return children;
}

export default ProtectedAuthAdmin;