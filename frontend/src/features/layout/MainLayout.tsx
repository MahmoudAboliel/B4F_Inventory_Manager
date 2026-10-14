import { Outlet } from "react-router"
import MainHeader from "./MainHeader"

const MainLayout = () => {
  return (
    <main>
        <MainHeader />
        <Outlet />
    </main>
  )
}

export default MainLayout