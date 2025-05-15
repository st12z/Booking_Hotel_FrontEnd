import { Menu } from "antd";
import { AppstoreOutlined,UserOutlined,
    ProductOutlined,
    CommentOutlined,
    SettingOutlined,
    HomeOutlined,
    PicCenterOutlined,
    SketchOutlined
   } from '@ant-design/icons';
import { Link } from "react-router-dom";
function MenuSider(){
  const items=[
    {
      key:"/dashboard",
      label:<Link to="">Dashboard</Link>,
      icon:<HomeOutlined />,
    },
  ]
  return(
    <>
      <Menu
        defaultSelectedKeys={["/dashboard"]}
        defaultOpenKeys={["/dashboard"]}
        mode="inline"
        items={items}
        style={{width:"240px",height:"100%"}}
      />
    </>
  )
}
export default MenuSider;