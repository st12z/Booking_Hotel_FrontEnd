import { Column } from "@ant-design/plots";
import "./StatisticRevenue.scss";
import { getFormatPrice } from "../../utils/format";
import { Select } from "antd";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useState } from "react";
import { API_DOMAIN_SOCKET } from "../../utils/variable";
import { getAmountBillsByMonth, getAmountRevenueByMonth } from "../../service/BookingService/BillService";
import { useSelector } from "react-redux";
function StatisticRevenue() {
  const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const options = monthArr.map((item) => {
    return {
      value: item,
      label: `Tháng ${item}`,
    };
  });

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState([{ day: 1, amount: 0 }]);
  const [reload, setReload] = useState();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const socket = new SockJS(`${API_DOMAIN_SOCKET}/ws`);
    const client = Stomp.over(socket);
    client.connect({}, () => {
      console.log("Connected to stomp");
      // lắng nghe thông báo
      client.subscribe(
        `/user/${user.email}/queue/amount-bills`,
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
        const res = await getAmountRevenueByMonth(currentMonth);
        console.log(res);
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
    width: 1000,
    height: 500,
  };
  const handleChange = (e) => {
    setCurrentMonth(e);
  };
  return (
    <>
      <div className="statistic-revenue">
        <p>Biểu đồ tổng tiền theo tháng</p>
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
export default StatisticRevenue;
