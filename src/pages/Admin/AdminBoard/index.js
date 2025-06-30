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
import {
  getAmountUsers,
  getAmountVisitsToday,
} from "../../../service/UserService/AuthService";
import { Stomp } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { API_DOMAIN_SOCKET } from "../../../utils/variable";
import { getAmountProperties } from "../../../service/RoomService/PropertyService";
import {
  getAmountBillsToday,
  getAmountRevenueToday,
} from "../../../service/BookingService/BillService";
import { getAmountReviews } from "../../../service/RoomService/ReviewService";
function AdminBoard() {
  const [amountVisitsToday, setAmountVisitsToday] = useState(0);
  const [amountUsers, setAmountUsers] = useState(0);
  const [amountProperties, setAmountProperties] = useState(0);
  const [amountBillsToday, setAmountBillsToday] = useState(0);
  const [amountReviews, setAmountReviews] = useState(0);
  const [amountRevenueToday, setAmountRevenueToday] = useState(0);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resAmountVisitsToday = await getAmountVisitsToday();
        const resAmountUsers = await getAmountUsers();
        const resAmountProperties = await getAmountProperties();
        const resAmountBillsToday = await getAmountBillsToday();
        const resAmountRevenueToday = await getAmountRevenueToday();
        const resAmountReviews = await getAmountReviews();
        if (resAmountVisitsToday.code == 200) {
          setAmountVisitsToday(resAmountVisitsToday.data);
        }
        if (resAmountUsers.code == 200) {
          setAmountUsers(resAmountUsers.data);
        }
        if (resAmountProperties.code == 200) {
          setAmountProperties(resAmountProperties.data);
        }
        if (resAmountBillsToday.code == 200) {
          setAmountBillsToday(resAmountBillsToday.data);
        }
        if (resAmountRevenueToday.code == 200) {
          setAmountRevenueToday(resAmountRevenueToday.data);
        }
        if (resAmountReviews.code == 200) {
          setAmountReviews(resAmountReviews.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
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
          setAmountVisitsToday(message);
        }
      );
      client.subscribe(
        `/user/${user.email}/queue/amount-users`,
        (returnMessage) => {
          console.log("Received message: ", returnMessage.body);
          setAmountUsers(amountUsers=>amountUsers+1);
        }
      );
      client.subscribe(
        `/user/${user.email}/queue/amount-bills-today`,
        (returnMessage) => {
          console.log("Received message: ", returnMessage.body);
          const message = JSON.parse(returnMessage.body);
          setAmountBillsToday(amountBillsToday=>amountBillsToday+message);
        }
      );
      client.subscribe(
        `/user/${user.email}/queue/amount-reviews`,
        (returnMessage) => {
          console.log("Received message: ", returnMessage.body);
          setAmountReviews(amountReviews=>amountReviews+1);
        }
      );
      client.subscribe(
        `/user/${user.email}/queue/amount-revenue-today`,
        (returnMessage) => {
          const message = JSON.parse(returnMessage.body);
          console.log(message);
          setAmountRevenueToday(amountRevenueToday=>amountRevenueToday + message);
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
              value={amountBillsToday}
              color={"#5DD5C7"}
            />
          </Col>
          <Col span={8}>
            <DashBoardItem
              icon=<EyeOutlined />
              title="Số lượng truy cập hôm nay"
              value={amountVisitsToday}
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
          <Col span={24}>
            <StatisticBill />
          </Col>
          <Col span={24}>
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
