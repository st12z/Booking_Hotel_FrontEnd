import { Pie } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { getStatisticTransactionType } from "../../service/PaymentService/payment";
import { Select } from "antd";

function PieChartPaymentTransaction() {
  const [data,setData] = useState([]);
  const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const options = monthArr.map((item) => {
    return {
      value: item,
      label: `Tháng ${item}`,
    };
  });
  useEffect(()=>{
    const fetchApi=async ()=>{
      try{
        const res = await getStatisticTransactionType(currentMonth);
        console.log(res);
        if(res.code==200){
          const data = res.data.map(item=>(
            {
              type: item.transactionType,
              value: item.amount
            }
          ));
          setData(data);
        }
      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  },[currentMonth]);
  const config = {
    data: data,
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  const handleChangeMonth = (e) => {
    setCurrentMonth(e);
  };
  return (
    <>
      <div className="statistic statistic__trantype">
        <p>Biểu đồ phần trăm loại giao dịch</p>
        <Select
          defaultValue={currentMonth}
          style={{ width: 120, marginRight: "20px"}}
          onChange={handleChangeMonth}
          options={options}
        />
        <Pie {...config} />
      </div>
    </>
  );
}
export default PieChartPaymentTransaction;
