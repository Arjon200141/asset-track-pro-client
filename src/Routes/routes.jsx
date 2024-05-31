import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Home/Home";
import JoinEmployee from "../Pages/JoinEmployee";
import JoinHR from "../Pages/JoinHR";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path: "/employeejoin",
          element: <JoinEmployee></JoinEmployee>,
        },
        {
          path:"/hrjoin",
          element:<JoinHR></JoinHR>
        }
      ]
    }
    
  ]);

export default router;