import { useEffect, useState } from "react";
import { getRevenueRefundByMonth } from "../../service/BookingService/RefundBillService";
import { Column } from "@ant-design/plots";
import { Select } from "antd";

function ChartRefundBill() {
  const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const options = monthArr.map((item) => {
    return {
      value: item,
      label: `Tháng ${item}`,
    };
  });
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState([{ day: 1, amount: 0 }]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getRevenueRefundByMonth(currentMonth);
        console.log("amount revenue:", res);
        if (res.code == 200) {
          setData(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [currentMonth]);
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
        <p>Biểu đồ tổng tiền hoàn theo tháng</p>
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
export default ChartRefundBill;
