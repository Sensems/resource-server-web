import { RouteObject } from 'react-router-dom';
import Home from '../view/home/home';
import Login from '../view/login/login'

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/:path*',
        element: <Home />,
      }
    ]
  },


]

export default routes;