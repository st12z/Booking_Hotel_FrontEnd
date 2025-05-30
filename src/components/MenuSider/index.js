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
import { FaCity } from "react-icons/fa";

function MenuSider(){
  const items=[
    {
      key:"/dashboard",
      label:<Link to="">Dashboard</Link>,
      icon:<HomeOutlined />,
    },
    {
      key:"/properties",
      label:<Link to="/admin/properties">Quản lý khách sạn</Link>,
      icon:<FaCity />,
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