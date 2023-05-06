import { useRoutes } from "react-router-dom"
import routes from "./router"
import AuthRoute from "./hoc/AuthRoute"

function App() {
  const element = useRoutes(routes)

  return (
    <AuthRoute>
      {element}
    </AuthRoute>
  )
}

export default App
