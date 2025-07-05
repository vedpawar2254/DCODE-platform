import { RouterProvider } from "react-router-dom"
import { routes } from "./routes/Routes"
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <>
    <RouterProvider router={routes} />
    <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App