/* global process */

import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { MainPage } from "./components/MainPage/MainPage.jsx";
import Layout from "./components/Layout.jsx";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "",
                    element: <MainPage />,
                },
            ],
        },
    ],
    {
        basename: '/x-port',
    }
);


function App() {
    return (
        <>
            {/* <Provider store={store}> */}
            <RouterProvider router={router}></RouterProvider>
            {/* </Provider> */}
        </>
    );
}

export default App;