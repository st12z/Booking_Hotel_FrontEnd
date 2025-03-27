import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/home";

export const routes=[
  {
    path:"/",
    element: <LayoutDefault/>,
    children:[
      {
        path:"",
        element:<Home/>
      }
    ]
  }
]