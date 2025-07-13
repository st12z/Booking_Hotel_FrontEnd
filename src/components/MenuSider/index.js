import { Menu } from "antd";
import { AppstoreOutlined,UserOutlined,
    ProductOutlined,
    CommentOutlined,
    SettingOutlined,
    HomeOutlined,
    PicCenterOutlined,
    SketchOutlined,
   } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { FaCity  } from "react-icons/fa";
import { BsCardList } from "react-icons/bs";

import { BsCalendar2Event,BsActivity  } from "react-icons/bs";


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
    {
      key:"/bills",
      label:<Link to="/admin/bills">Quản lý hóa đơn</Link>,
      icon:<BsCalendar2Event />
    },
    {
      key:"/refund-bills",
      label:<Link to="/admin/refund-bills">Quản lý hóa đơn hoàn tiền</Link>,
      icon:<BsCalendar2Event />
    },
    {
      key:"/payment-transactions",
      label:<Link to="/admin/payment-transactions">Quản lý giao dịch</Link>,
      icon:<BsActivity  />
    },
    {
      key:"/payment-logs",
      label: <Link to="/admin/suspicious-payment-logs">Quản lý log giao dịch</Link>,
      icon: <BsCardList />
    }
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