
import { RouterProvider, createHashRouter, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAuthDataFromCookies, verifyToken } from './store/authSlice';
import { MainPage } from "./components/MainPage/MainPage.jsx";
import Layout from "./components/Layout.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import ProtectedDeal from "./components/Deal/Deal.jsx";
import { Appartments } from "./components/Appartments/Appartments.jsx";
import { LuxItems } from "./components/LuxItems/LuxItems.jsx";
import { Cars } from "./components/Cars/Cars.jsx";
import { B2B } from "./components/B2B/B2B.jsx";
import { Dashboard } from "./components/Dashboard/Dashboard.jsx";

const AuthLayout = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#1a1a1a' }}>
            <Outlet />
        </div>
    );
};

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            window.scrollTo(0, 0);
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null;
};

const router = createHashRouter(
    [
        {
            path: "",
            element: <Layout />,
            children: [
                {
                    path: "",
                    element: <MainPage />,
                },
                {
                    path: "apartments",
                    element: <Appartments />,
                },
                {
                    path: "cars",
                    element: <Cars />,
                },
                {
                    path: "lux-items",
                    element: <LuxItems />,
                },
                {
                    path: "b2b",
                    element: <B2B />,
                },
                {
                    path: "deal",
                    element: (
                        <ProtectedRoute>
                            <ProtectedDeal />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "dashboard",
                    element: (
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    ),
                },
            ],
        },
        {
            element: <AuthLayout />,
            children: [
                {
                    path: "/login",
                    element: <Login />,
                },
                {
                    path: "/register",
                    element: <Register />,
                },
            ],
        },
    ]
);


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAuthDataFromCookies());
        dispatch(verifyToken());
    }, [dispatch]);
    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    );
}

export default App;

