import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Home/Home";
import JoinEmployee from "../Pages/JoinEmployee";
import JoinHR from "../Pages/JoinHR";
import LogIn from "../Pages/LogIn";
import Profile from "../EmployeePages/Profile";
import AssetList from "../HRPages/AssetList";
import AddAssetList from "../HRPages/AddAssetList";


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
        },
        {
          path:"/eployeeprofile",
          element:<Profile></Profile>
        },
        {
          path:"/assetlist",
          element:<AssetList></AssetList>,
          loader: () => fetch('asset.json')
        },
        {
          path:"/addasset",
          element:<AddAssetList></AddAssetList>
        }
      ]
    }
    
  ]);

export default router;