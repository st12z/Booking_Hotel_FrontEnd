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
import AdminRoute from "../components/AdminRoute";
import AdminBoard from "../pages/Admin/AdminBoard";
import LayoutAdmin from "../layout/LayoutAdmin";
import RoomChats from "../pages/Admin/RoomChats";
import Chats from "../pages/Admin/Chats";
import Properties from "../pages/Admin/Properties";
import PropertyDetailAdmin from "../components/PropertyDetailAdmin";
import EditProperty from "../components/EditProperty";
import CreateRoomType from "../components/CreateRoomType";
import Bills from "../pages/Admin/Bills";
export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/properties/:slug",
        element: <PropertyDetail />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/callback",
        element: <CallBackPage />,
      },
      {
        path: "/properties-tym",
        element: <PropertiesTym />,
      },
      {
        path: "*",
        element: <NotFound404 />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/booking",
            element: <Booking />,
          },
          {
            path: "/payments",
            element: <PaymentCallBack />,
          },
          {
            path: "/bills",
            element: <MyBill />,
          },
          {
            path: "/bills/:billCode",
            element: <BillDetail />,
          },
          {
            path: "/chats",
            element: <Chat />,
          },
        ],
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: "/admin",
        element: <LayoutAdmin />,
        children:[
          {
            path:"",
            element: <AdminBoard/>
          },
          {
            path:"properties",
            element: <Properties/>
          },
          {
            path:"properties/:id",
            element: <PropertyDetailAdmin/>
          },
          {
            path:"properties/edit/:id",
            element: <EditProperty/>
          },
          {
            path:"properties/room-types/:id",
            element: <CreateRoomType />
          },
          {
            path: "room-chats",
            element: <RoomChats/>
          },
          {
            path: "room-chats/:id",
            element: <Chats/>
          },
          {
            path: "bills",
            element: <Bills/>
          }

        ]
      },
    ],
  },
];
