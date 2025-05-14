import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PropertyDetail from "../pages/PropertyDetail/PropertyDetail";
import CallBackPage from "../pages/CallBackPage";
import PropertiesTym from "../pages/PropertiesTym";
import Booking from "../pages/Booking";
import PrivateRoute from "../components/PrivateRoutes";
import PaymentCallBack from "../pages/PaymentCallBack";
import MyBill from "../pages/MyBill";
import BillDetail from "../pages/BillDetail";
import NotFound404 from "../pages/NotFound404";
import Chat from "../pages/Chat";
export const routes=[
  {
    path:"/",
    element: <LayoutDefault/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"/search",
        element:<Search/>
      },
      {
        path:"/properties/:slug",
        element: <PropertyDetail/>
      },
      {
        path:"/register",
        element: <Register/>
      },
      {
        path:"/login",
        element: <Login/>
      },
      {
        path:"/callback",
        element:<CallBackPage/>
      },
      {
        path:"/properties-tym",
        element: <PropertiesTym/>
      },
      {
        path:"*",
        element:<NotFound404/>
      },
      {
        element:<PrivateRoute/>,
        children:[
          {
            path:"/booking",
            element: <Booking/>
          },
          {
            path:"/payments",
            element: <PaymentCallBack/>
          },
          {
            path:"/bills",
            element: <MyBill />
          },
          {
            path:"/bills/:billCode",
            element: <BillDetail/>
          },
          {
            path:"/chats",
            element: <Chat/>
          }
        ]
      }
    ],
    
  }
]