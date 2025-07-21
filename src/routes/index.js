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
import DetailBills from "../pages/Admin/DetailBill";
import DetailBill from "../pages/Admin/DetailBill";
import EditRoomType from "../pages/Admin/EditRoomType";
import CreateProperties from "../pages/Admin/CreateProperties";
import RefundBills from "../pages/Admin/RefundBills";
import PaymentTransactions from "../pages/Admin/AdminBoard/PaymentTransactions";
import BookingCheckOtp from "../pages/BookingCheckOtp";
import PaymentLogs from "../pages/Admin/PaymentLogs";
import Cities from "../pages/Admin/Cities";
import EditCity from "../pages/Admin/EditCity";
import CreateCity from "../pages/Admin/CreateCity";
import Trips from "../pages/Admin/Trips";
import EditTrip from "../pages/Admin/EditTrip";
import CreateTrip from "../pages/Admin/CreateTrip";
import TripTypes from "../pages/Admin/TripTypes";
import EditTripType from "../pages/Admin/EditTripType";
import CreateTripType from "../pages/Admin/CreateTripType";
import PropertyTypes from "../pages/Admin/PropertyTypes";
import EditPropertyType from "../pages/Admin/EditPropertyType";
import CreatePropertyType from "../pages/Admin/CreatePropertyType";
import MyDiscounts from "../pages/MyDiscounts";
import DiscountHotels from "../pages/Admin/DiscountHotels";
import DiscountCars from "../pages/Admin/DiscountCars";
import EditDiscountHotels from "../pages/Admin/EditDiscountHotels";
import CreateDiscountHotel from "../pages/Admin/CreateDiscountHotel";
import EditDiscountCars from "../pages/Admin/EditDiscountCars";
import CreateDiscountCar from "../pages/Admin/CreateDiscountCar";
import Facilities from "../pages/Admin/Facilities";
import EditFacilities from "../pages/Admin/EditFacilities";
import CreateFacilities from "../pages/Admin/CreateFacilities";
import Reviews from "../pages/Admin/Reviews";
import Roles from "../pages/Admin/Roles";
import Vehicles from "../pages/Admin/Vehicles";
import ManagerRoomChats from "../pages/Admin/ManageRoomChats";
import Users from "../pages/Admin/ManageUsers";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageRoomChats from "../pages/Admin/ManageRoomChats";
import Setting from "../pages/Admin/Setting";
import EditVehicles from "../pages/Admin/EditVehicles";
import CreateVehicles from "../pages/Admin/CreateVehicles";
import DetailRefundBill from "../pages/Admin/DetailRefundBill";
import DetailRoomChats from "../pages/Admin/DetailRoomChats";
import CreateRole from "../pages/Admin/CreateRole";
import EditRoleOfUser from "../pages/Admin/EditRoleOfUser";
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
            path: "check-booking-otp",
            element: <BookingCheckOtp />,
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
          {
            path: "my-discounts",
            element: <MyDiscounts/>
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
        children: [
          {
            path: "",
            element: <AdminBoard />,
          },
          {
            path: "properties",
            element: <Properties />,
          },
          {
            path: "properties/:id",
            element: <PropertyDetailAdmin />,
          },
          {
            path: "properties/create",
            element: <CreateProperties />,
          },
          {
            path: "properties/edit/:id",
            element: <EditProperty />,
          },
          {
            path: "properties/room-types/:id",
            element: <CreateRoomType />,
          },
          {
            path: "properties/room-types/edit/:id",
            element: <EditRoomType />,
          },
          {
            path: "room-chats",
            element: <RoomChats />,
          },
          {
            path: "room-chats/:id",
            element: <Chats />,
          },
          {
            path: "bills",
            element: <Bills />,
          },
          {
            path: "refund-bills",
            element: <RefundBills />,
          },
          {
            path: "refund-bills/:id",
            element: <DetailRefundBill />,
          },
          {
            path: "bills/:billCode",
            element: <DetailBill />,
          },
          {
            path: "payment-transactions",
            element: <PaymentTransactions />,
          },
          {
            path: "suspicious-payment-logs",
            element: <PaymentLogs />
          },
          {
            path: "cities",
            element: <Cities />
          },
          {
            path: "cities/create",
            element: <CreateCity/>
          },
          {
            path: "cities/edit/:id",
            element: <EditCity />
          },
          {
            path: "trips",
            element: <Trips/>
          },
          {
            path: "trips/edit/:id",
            element: <EditTrip/>
          },
          {
            path: "trips/create",
            element: <CreateTrip />
          },
          {
            path: "trip-types",
            element: <TripTypes/>
          },
          {
            path: "trip-types/edit/:id",
            element: <EditTripType/>
          },
          {
            path: "trip-types/create",
            element: <CreateTripType/>
          },
          {
            path: "property-types",
            element: <PropertyTypes/>
          },
          {
            path: "property-types/edit/:id",
            element: <EditPropertyType/>
          },
          {
            path: "property-types/create",
            element: <CreatePropertyType/>
          },
          {
            path: "discount-hotels",
            element: <DiscountHotels/>
          },
          {
            path: "discount-cars",
            element: <DiscountCars/>
          },
          {
            path: "discount-cars/edit/:id",
            element: <EditDiscountCars/>
          },
          {
            path: "discount-hotels/edit/:id",
            element: <EditDiscountHotels/>
          },
          {
            path: "discount-hotels/create",
            element: <CreateDiscountHotel/>
          },
          {
            path: "discount-cars/create",
            element: <CreateDiscountCar/>
          },
          {
            path: "facilities",
            element: <Facilities/>
          },
          {
            path: "facilities/edit/:id",
            element: <EditFacilities/>
          },
          {
            path: "facilities/create",
            element: <CreateFacilities/>
          },
          {
            path: "reviews",
            element: <Reviews/>
          },
          {
            path: "roles",
            element: <Roles/>
          },
          {
            path: "vehicles",
            element: <Vehicles/>
          },
          {
            path: "manage-room-chats",
            element: <ManageRoomChats/>
          },
          {
            path: "manage-users",
            element: <ManageUsers/>
          },
          {
            path: "setting",
            element: <Setting/>
          },
          {
            path: "vehicles/edit/:id",
            element: <EditVehicles/>
          },
          {
            path: "vehicles/create",
            element: <CreateVehicles/>
          },
          {
            path: "manage-room-chats/:id",
            element: <DetailRoomChats/>
          },
          {
            path: "roles/create",
            element: <CreateRole/>
          },
          {
            path: "users/edit-roles/:id",
            element: <EditRoleOfUser/>
          }
        ],
      },
    ],
  },
];
