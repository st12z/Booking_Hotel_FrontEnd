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
function AdminBoard() {
  const [amountVisits,setAmountVisits]=useState();
  const [amountUsers,setAmountUsers]=useState();
  const user = useSelector(state=>state.user);
  useEffect(()=>{
    const fetchApi=async()=>{
      try{
        const resAmountVisits = await getAmountVisits();
        const resAmountUsers = await getAmountUsers();
        if(resAmountVisits.code==200){
          setAmountVisits(resAmountVisits.data);
        }
        if(resAmountUsers.code==200){
          setAmountUsers(resAmountUsers.data);
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
              value={20}
              color={"#44A1EB"}
            />
          </Col>
          <Col span={8}>
            <DashBoardItem
              icon=<CarryOutOutlined />
              title="Hóa đơn hôm nay"
              value={20}
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
              icon=<HomeOutlined />
              title="Đặt phòng hôm nay"
              value={40}
              color={"#6DB9F0"}
            />
          </Col>
          <Col span={8}>
            <DashBoardItem
              icon=<CommentOutlined />
              title="Tổng số đánh giá"
              value={40}
              color={"#E32323"}
            />
          </Col>
          <Col span={8}>
            <DashBoardItem
              icon=<LineChartOutlined />
              title="Doanh thu hôm nay"
              value={getFormatPrice(40)}
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
