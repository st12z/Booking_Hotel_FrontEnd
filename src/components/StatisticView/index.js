import { Column } from "@ant-design/plots";
import "./StatisticView.scss";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { getAmountVisitsByMonth } from "../../service/UserService/AuthService";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { API_DOMAIN_SOCKET } from "../../utils/variable";
import { useSelector } from "react-redux";
function StatisticView() {
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
    const token = localStorage.getItem("access_token");
    client.connect({ Authorization: `Bearer ${token}` }, () => {
      console.log("Connected to stomp");
      // lắng nghe thông báo
      client.subscribe(
        `/user/${user.email}/queue/update-visits`,
        (returnMessage) => {
          setReload(Date.now());
        }
      );
    });
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getAmountVisitsByMonth(currentMonth);
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
      <div className="statistic-view">
        <p>Biểu đồ lượng truy cập</p>
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
export default StatisticView;
