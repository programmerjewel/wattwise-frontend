import { createBrowserRouter } from "react-router";
import Mainlayout from "../layout/Mainlayout";
import Errorpage from "../pages/Errorpage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout></Mainlayout>,
    errorElement: <Errorpage></Errorpage>,
    children:[
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      }
    ]
  }
])