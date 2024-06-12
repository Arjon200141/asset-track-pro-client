import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../Root/Root";
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
import UpdateAsset from "../HRPages/UpdateAsset";
import BuyPackage from "../Payment/BuyPackage";
import Payment from "../Payment/Payment";
import HRDashBoard from "../HRDashBoard/HRDashBoard";
import Home from "../Home/Home";
import EmployeeDashBoard from "../EmployeeNavbar/EmployeeNavbar";
import MyTeam from "../EmployeePages/MyTeam";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>
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
        path: "/updateasset/:id",
        element: <UpdateAsset></UpdateAsset>,
        loader: ({ params }) => fetch(`https://assettrack-pro-server.vercel.app/updateasset/${params.id}`)
      },
      {
        path: "/buy-package",
        element: <BuyPackage></BuyPackage>,
        loader: () => fetch('https://assettrack-pro-server.vercel.app/package-info')
      },
      {
        path: "/payment/:id",
        element: <Payment></Payment>
      },
    ]
  },
  {
    path: "dashboard",
    element: <HRDashBoard></HRDashBoard>,
    children: [
      {
        path: "hrhome",
        element: <HRHome></HRHome>
      },
      {
        path: "assetlist",
        element: <AssetList></AssetList>,
        loader: () => fetch('https://assettrack-pro-server.vercel.app/assets')
      },
      {
        path: "addasset",
        element: <AddAssetList></AddAssetList>
      },
      {
        path: "allrequest",
        element: <AllRequest></AllRequest>
      },

      {
        path: "addemployee",
        element: <AddEmployee></AddEmployee>
      },
      {
        path: "profile",
        element: <Profile></Profile>
      },
      {
        path: "myemployee",
        element: <EmployeeList></EmployeeList>
      },
    ]
  },
  {
    path: "employeedashboard",
    element: <EmployeeDashBoard></EmployeeDashBoard>,
    children: [
      {
        path: "emphome",
        element: <EmployeeHome></EmployeeHome>
      },
      {
        path: "myassets",
        element: <MyAssets></MyAssets>,
        loader: () => fetch('https://assettrack-pro-server.vercel.app/requests')
      },
      {
        path: "request",
        element: <RequestForAsset></RequestForAsset>,
        loader: () => fetch('https://assettrack-pro-server.vercel.app/assets')
      },
      {
        path: "eployeeprofile",
        element: <Profile></Profile>
      },
      {
        path:"myteam",
        element:<MyTeam></MyTeam>
      }
    ]
  }
]);

export default router;
