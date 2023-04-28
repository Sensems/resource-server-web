import { RouteObject } from 'react-router-dom';
import Home from '../view/home/home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/:path*',
        element: <Home />,
      }
    ]
  }
]

export default routes;