import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/home";
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
      }
    ]
  }
]