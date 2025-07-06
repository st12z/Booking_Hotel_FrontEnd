import { useEffect, useState } from "react";
import { getRevenueRefundByMonth } from "../../service/BookingService/RefundBillService";
import { Column } from "@ant-design/plots";
import { Select } from "antd";
import { getAmountTransactionByMonth } from "../../service/PaymentService/payment";
import { label } from "framer-motion/client";

function ChartAmountPaymentTransaction() {
  const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState([{ day: 1, amount: 0 }]);
  const [transactionType,setTransactionType] = useState("0");
  const options = monthArr.map((item) => {
    return {
      value: item,
      label: `Tháng ${item}`,
    };
  });
  const transactionTypeOptions = [
    {
      value: "REFUND",
      label: "Hoàn tiền"
    },
    {
      value: "PAYMENT",
      label: "Thanh toán"
    },
    {
      value: "0",
      label: "Loại giao dịch"
    }
  ]
  
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const filter={
          month: currentMonth,
          transactionType: transactionType
        }
        console.log(filter);
        const res = await getAmountTransactionByMonth(filter);
        console.log("amount transaction:", res);
        if (res.code == 200) {
          setData(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [currentMonth,transactionType]);
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
  const handleChangeMonth = (e) => {
    setCurrentMonth(e);
  };
  const handleChangeTransactionType = (e)=>{
    setTransactionType(e);
  }
  return (
    <>
      <div className="statistic statistic__amount" >
        <p>Biểu đồ số lượng giao dịch</p>
        <Select
          defaultValue={currentMonth}
          style={{ width: 120, marginRight: "20px"}}
          onChange={handleChangeMonth}
          options={options}
        />
        <Select
          defaultValue={transactionType}
          style={{ width: 180 }}
          onChange={handleChangeTransactionType}
          options={transactionTypeOptions}
        />
        <Column {...config} />;
      </div>
    </>
  );
}
export default ChartAmountPaymentTransaction;
