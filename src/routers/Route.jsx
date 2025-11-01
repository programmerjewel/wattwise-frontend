import { createBrowserRouter } from "react-router";
import Mainlayout from "../layout/Mainlayout";
import Errorpage from "../pages/Errorpage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout></Mainlayout>,
    errorElement: <Errorpage></Errorpage>
  }
])