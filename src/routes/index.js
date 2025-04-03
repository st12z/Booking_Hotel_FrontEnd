import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/home";
import PropertyDetail from "../pages/property-detail/PropertyDetail";
import Search from "../pages/search";

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
      }
    ]
  }
]