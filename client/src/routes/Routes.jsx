import { createBrowserRouter } from "react-router-dom"
import AppLayout from "../components/layout/AppLayout/AppLayout"

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        // children: [
        //     {
        //         path: "*",
        //         element: <NotFound/>
        //     }
        // ]
    }
])