import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PropertyDetail from "../pages/PropertyDetail/PropertyDetail";
import CallBackPage from "../pages/CallBackPage";
import PropertiesTym from "../pages/PropertiesTym";
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
      }
    ]
  }
]