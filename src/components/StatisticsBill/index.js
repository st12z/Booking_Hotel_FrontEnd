import { Select } from "antd";
import "./StatisticBill.scss";
import { Column } from "@ant-design/plots";
import { useEffect, useState } from "react";
import {
  getAmountBills,
  getAmountBillsByMonth,
} from "../../service/BookingService/BillService";
import { useSelector } from "react-redux";
import { API_DOMAIN_SOCKET } from "../../utils/variable";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
function StatisticBill() {
  const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const options = monthArr.map((item) => {
    return {
      value: item,
      label: `Tháng ${item}`,
    };
  });
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState([{day:1,amount:0}]);
  const [reload, setReload] = useState();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const socket = new SockJS(`${API_DOMAIN_SOCKET}/ws`);
    const client = Stomp.over(socket);
    client.connect({}, () => {
      console.log("Connected to stomp");
      // lắng nghe thông báo
      client.subscribe(
        `/user/${user.email}/queue/amount-bills-today`,
        (returnMessage) => {
          const message = JSON.parse(returnMessage.body);
          setReload(Date.now());
        }
      );
    });
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getAmountBillsByMonth(currentMonth);
        console.log(res);
        if (res.code == 200) {
          setData(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [currentMonth, reload]);
  const config = {
    data,
    xField: "day",
    yField: "amount",
    onReady: ({ chart }) => {
      try {
        const { height } = chart._container.getBoundingClientRect();
        const tooltipItem = data[Math.floor(Math.random() * data.length)];
        chart.on(
          "afterrender",
          () => {
            chart.emit("tooltip:show", {
              data: {
                data: tooltipItem,
              },
              offsetY: height / 2 - 60,
            });
          },
          true
        );
      } catch (e) {
        console.error(e);
      }
    },
    width: 600,
    height: 500,
  };
  const handleChange = (e) => {
    setCurrentMonth(e);
  };
  return (
    <>
      <div className="statistic-bill">
        <p>Biểu đồ hóa đơn</p>
        <Select
          defaultValue={currentMonth}
          style={{ width: 120 }}
          onChange={handleChange}
          options={options}
        />
        <Column {...config} />;
      </div>
    </>
  );
}
export default StatisticBill;
