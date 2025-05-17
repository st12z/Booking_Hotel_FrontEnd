import { Col, Row } from "antd";
import DashBoardItem from "../../../components/DashBoardItem";
import {
  UserOutlined,
  HomeOutlined,
  RiseOutlined,
  CommentOutlined,
  EyeOutlined,
  CarryOutOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import "./AdminBoard.scss";
import { getFormatPrice } from "../../../utils/format";
import StatisticBill from "../../../components/StatisticsBill";
import StatisticView from "../../../components/StatisticView";
import StatisticRevenue from "../../../components/StatisticRevenue";
import ListBillRecently from "../../../components/ListBillRecently";
import { useEffect, useState } from "react";
import { getAmountUsers, getAmountVisits } from "../../../service/UserService/AuthService";
import { Stomp } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { API_DOMAIN_SOCKET } from "../../../utils/variable";
import { getAmountProperties } from "../../../service/RoomService/PropertyService";
import { getAmountBills, getAmountRevenueToday } from "../../../service/BookingService/BillService";
import { getAmountReviews } from "../../../service/RoomService/ReviewService";
function AdminBoard() {
  const [amountVisits,setAmountVisits]=useState();
  const [amountUsers,setAmountUsers]=useState();
  const [amountProperties,setAmountProperties]=useState();
  const [amountBills,setAmountBills]=useState();
  const [amountReviews,setAmountReviews]=useState();
  const [amountRevenueToday,setAmountRevenueToday]=useState();
  const user = useSelector(state=>state.user);
  useEffect(()=>{
    const fetchApi=async()=>{
      try{
        const resAmountVisits = await getAmountVisits();
        const resAmountUsers = await getAmountUsers();
        const resAmountProperties = await getAmountProperties();
        const resAmountBills = await getAmountBills();
        const resAmountRevenueToday = await getAmountRevenueToday();
        const resAmountReviews = await getAmountReviews();
        if(resAmountVisits.code==200){
          setAmountVisits(resAmountVisits.data);
        }
        if(resAmountUsers.code==200){
          setAmountUsers(resAmountUsers.data);
        }
        if(resAmountProperties.code==200){
          setAmountProperties(resAmountProperties.data);
        }
        if(resAmountBills.code==200){
          setAmountBills(resAmountBills.data);
        }
        if(resAmountRevenueToday.code==200){
          setAmountRevenueToday(resAmountRevenueToday.data);
        }
        if(resAmountReviews.code==200){
          setAmountReviews(resAmountReviews.data);
        }
      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  },[]);
  // Kết nối websocket
  useEffect(() => {
    if (!user?.email) return;

    const socket = new SockJS(`${API_DOMAIN_SOCKET}/ws`);
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("Connected to stomp");
      // lắng nghe thông báo
      client.subscribe(
        `/user/${user.email}/queue/update-visits`,
        (returnMessage) => {
          const message = JSON.parse(returnMessage.body);
          console.log(message);
          setAmountVisits(message);
          
        }
      );
      client.subscribe(
        `/user/${user.email}/queue/amount-users`,
        (returnMessage) => {
          const message = JSON.parse(returnMessage.body);
          console.log(message);
          setAmountUsers(message);
          
        }
      );
      client.subscribe(
        `/user/${user.email}/queue/amount-bills`,
        (returnMessage) => {
          const message = JSON.parse(returnMessage.body);
          console.log(message);
          setAmountBills(message);
          
        }
      );
      client.subscribe(
        `/user/${user.email}/queue/amount-reviews`,
        (returnMessage) => {
          const message = JSON.parse(returnMessage.body);
          console.log(message);
          setAmountReviews(message);
          
        }
      );
      client.subscribe(
        `/user/${user.email}/queue/amount-revenue-today`,
        (returnMessage) => {
          const message = JSON.parse(returnMessage.body);
          console.log(message);
          setAmountRevenueToday(message);
          
        }
      );
    });

    return () => {
      if (client && client.connected) {
        console.log("disconnected");
        client.disconnect();
      }
    };
  }, [user.email]);
  return (
    <>
      <div className="dashboard-icon">
        <span className="span-icon">
          <HomeOutlined className="icon" />
        </span>
        <span>Dashboard</span>
      </div>
      <div className="dashboard-panel">
        <Row gutter={[10, 10]}>
          <Col span={8}>
            <DashBoardItem
              icon=<UserOutlined />
              title="Người dùng"
              value={amountUsers}
              color={"#FE96AB"}
            />
          </Col>
          <Col span={8}>
            <DashBoardItem
              icon=<HomeOutlined />
              title="Khách sạn"
              value={amountProperties}
              color={"#44A1EB"}
            />
          </Col>
          <Col span={8}>
            <DashBoardItem
              icon=<CarryOutOutlined />
              title="Hóa đơn hôm nay"
              value={amountBills}
              color={"#5DD5C7"}
            />
          </Col>
          <Col span={8}>
            <DashBoardItem
              icon=<EyeOutlined />
              title="Số lượng truy cập hôm nay"
              value={amountVisits}
              color={"#FE9596"}
            />
          </Col>
          <Col span={8}>
            <DashBoardItem
              icon=<CommentOutlined />
              title="Tổng số đánh giá"
              value={amountReviews}
              color={"#E32323"}
            />
          </Col>
          <Col span={8}>
            <DashBoardItem
              icon=<LineChartOutlined />
              title="Doanh thu hôm nay"
              value={getFormatPrice(amountRevenueToday)}
              color={"#FFD86B"}
            />
          </Col>
        </Row>
      </div>
      <div className="dashboard-chart">
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <StatisticBill />
          </Col>
          <Col span={12}>
            <StatisticView />
          </Col>
          <Col span={24}>
            <StatisticRevenue />
          </Col>
          <Col span={24}>
            <ListBillRecently />
          </Col>
        </Row>
      </div>
    </>
  );
}
export default AdminBoard;
