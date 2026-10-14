import { RouterProvider } from "react-router"
import ProductsPage from "./features/products/pages/Products"
import { router } from "./lib/constants"

function App() {
  return (
    <>
      {/* <ProductsPage></ProductsPage> */}
      <RouterProvider router={router} />
    </>
  )
}

export default App
