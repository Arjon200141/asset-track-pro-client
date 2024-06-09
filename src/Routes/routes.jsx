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
import RequestForAsset from "../EmployeePages/RequestForAsset";
import MyAssets from "../EmployeePages/MyAssets";


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
          loader: () => fetch('http://localhost:4000/assets')
        },
        {
          path:"/addasset",
          element:<AddAssetList></AddAssetList>
        },
        {
          path:"/request",
          element: <RequestForAsset></RequestForAsset>,
          loader: () => fetch('http://localhost:4000/assets')
        },
        {
          path:"/myassets",
          element:<MyAssets></MyAssets>,
          loader: () => fetch('http://localhost:4000/requests')
        }
      ]
    }
    
  ]);

export default router;