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
import AllRequest from "../HRPages/AllRequest";
import EmployeeList from "../HRPages/EmployeeList";
import AddEmployee from "../HRPages/AddEmployee";
import EmployeeHome from "../EmployeeHome/EmployeeHome";
import HRHome from "../HRHome/HRHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <HRHome></HRHome>
      },
      {
        path: "/employeejoin",
        element: <JoinEmployee></JoinEmployee>,
      },
      {
        path: "/hrjoin",
        element: <JoinHR></JoinHR>
      },
      {
        path: "/login",
        element: <LogIn></LogIn>
      },
      {
        path: "/eployeeprofile",
        element: <Profile></Profile>
      },
      {
        path: "/assetlist",
        element: <AssetList></AssetList>,
        loader: () => fetch('http://localhost:4000/assets')
      },
      {
        path: "/addasset",
        element: <AddAssetList></AddAssetList>
      },
      {
        path: "/request",
        element: <RequestForAsset></RequestForAsset>,
        loader: () => fetch('http://localhost:4000/assets')
      },
      {
        path: "/myassets",
        element: <MyAssets></MyAssets>,
        loader: () => fetch('http://localhost:4000/requests')
      },
      {
        path: "/allrequest",
        element: <AllRequest></AllRequest>
      },
      {
        path: "/myemployee",
        element: <EmployeeList></EmployeeList>
      },
      {
        path: "/addemployee",
        element: <AddEmployee></AddEmployee>
      },
      {
        path: "/employeehome",
        element: <EmployeeHome></EmployeeHome>
      },
      // {
      //   path: "/hrhome",
      //   element: <HRHome></HRHome>
      // }
    ]
  }
]);

export default router;
