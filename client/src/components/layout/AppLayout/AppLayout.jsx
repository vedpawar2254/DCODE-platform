import { Outlet } from "react-router-dom"
import NavBar from "../NavBar/NavBar"
import Footer from "../Footer/Footer"

const AppLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default AppLayout