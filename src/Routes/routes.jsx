import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Home/Home";
import JoinEmployee from "../Pages/JoinEmployee";
import JoinHR from "../Pages/JoinHR";
import LogIn from "../Pages/LogIn";


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
        },
        {
          path:"/login",
          element:<LogIn></LogIn>
        }
      ]
    }
    
  ]);

export default router;