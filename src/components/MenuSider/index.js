import { Menu } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  ProductOutlined,
  CommentOutlined,
  SettingOutlined,
  HomeOutlined,
  PicCenterOutlined,
  SketchOutlined,
  GiftOutlined,
  LikeOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FaCity } from "react-icons/fa";
import {
  BsCardList,
  BsCloudHaze,
  BsCardText,
  BsBackpack2,
  BsCarFront,
  BsChatText,
  BsClipboard2Pulse

} from "react-icons/bs";

import {
  BsCalendar2Event,
  BsActivity,
  BsHospital,
  BsHouses,
  BsBagHeart,
} from "react-icons/bs";

function MenuSider() {
  const items = [
    {
      key: "/dashboard",
      label: <Link to="">Dashboard</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "/properties",
      label: <Link to="/admin/properties">Quản lý khách sạn</Link>,
      icon: <FaCity />,
    },
    {
      key: "/propertie-types",
      label: <Link to="/admin/property-types">Quản lý loại khách sạn</Link>,
      icon: <BsHouses />,
    },
    {
      key: "/bills",
      label: <Link to="/admin/bills">Quản lý hóa đơn</Link>,
      icon: <BsCalendar2Event />,
    },
    {
      key: "/refund-bills",
      label: <Link to="/admin/refund-bills">Quản lý hóa đơn hoàn tiền</Link>,
      icon: <BsCalendar2Event />,
    },
    {
      key: "/payment-transactions",
      label: <Link to="/admin/payment-transactions">Quản lý giao dịch</Link>,
      icon: <BsActivity />,
    },
    {
      key: "/payment-logs",
      label: (
        <Link to="/admin/suspicious-payment-logs">Quản lý log giao dịch</Link>
      ),
      icon: <BsCardList />,
    },
    {
      key: "/cities",
      label: <Link to="/admin/cities">Quản lý thành phố</Link>,
      icon: <BsHospital />,
    },
    {
      key: "trips",
      label: <Link to="/admin/trips">Quản lý điểm đến</Link>,
      icon: <BsCloudHaze />,
    },
    {
      key: "trip_types",
      label: <Link to="/admin/trip-types">Quản lý loại điểm đến</Link>,
      icon: <BsCardText />,
    },
    {
      key: "discounts",
      label: "Quản lý phiếu giảm giá",
      icon: <GiftOutlined /> ,
      children: [
        {
          key: "discounts-hotels",
          label: (
            <Link to="/admin/discount-hotels">Phiếu giảm giá khách sạn</Link>
          ),
        },
        {
          key: "discounts-cars",
          label: "Phiếu đặt xe",
          label: <Link to="/admin/discount-cars">Phiếu giảm giá đặt xe</Link>,
        },
      ],
    },
    {
      key: "facilities",
      label: <Link to="/admin/facilities">Quản lý tiện ích</Link>,
      icon: <BsBackpack2 />,
    },
    {
      key: "reviews",
      label: <Link to="/admin/reviews">Quản lý đánh giá</Link>,
      icon: <LikeOutlined />,
    },
    {
      key: "vehicles",
      label: <Link to="/admin/vehicles">Quản lý phương tiện</Link>,
      icon: <BsCarFront  />,
    },
    {
      key: "room-chats",
      label: <Link to="/admin/manage-room-chats">Quản lý phòng chat</Link>,
      icon: <BsChatText  />,
    },
    {
      key: "roles",
      label: <Link to="/admin/roles">Quản lý role</Link>,
      icon: <BsClipboard2Pulse  />,
    },
    {
      key: "users",
      label: <Link to="/admin/manage-users">Quản lý người dùng</Link>,
      icon: <UserOutlined /> ,
    },
    {
      key: "setting",
      label: <Link to="/admin/setting">Cài đặt chung</Link>,
      icon: <SettingOutlined />
    },
  ];
  return (
    <>
      <Menu
        defaultSelectedKeys={["/dashboard"]}
        defaultOpenKeys={["/dashboard"]}
        mode="inline"
        items={items}
        style={{ width: "240px", height: "100%" }}
      />
    </>
  );
}
export default MenuSider;
