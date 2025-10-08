// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./NavBar/Navbar.jsx";;

export default function Layout() {
    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return (
        <div>
            {/* {!isAuthenticated && <Navigate to={"/"} />} */}
            <Navbar />
            <Outlet />
        </div>
    );
}