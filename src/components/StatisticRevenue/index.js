import { Column } from "@ant-design/plots";
import "./StatisticRevenue.scss";
import { getFormatPrice } from "../../utils/format";
import { Select } from "antd";
function StatisticRevenue() {
  const monthArr=[1,2,3,4,5,6,7,8,9,10,11,12];
  const options=monthArr.map(item=>{
    return{
      value:item,
      label:`Tháng ${item}`
    }
  });
   const data = [
    { letter: "01", frequency: 8167 },
    { letter: "02", frequency: 1492 },
    { letter: "03", frequency: 2782 },
    { letter: "04", frequency: 4253 },
    { letter: "05", frequency: 12702 },
    { letter: "06", frequency: 8167 },
    { letter: "07", frequency: 1492 },
    { letter: "08", frequency: 2782 },
    { letter: "09", frequency: 4253 },
    { letter: "10", frequency: 12702 },
    { letter: "11", frequency: 8167 },
    { letter: "12", frequency: 1492 },
    { letter: "13", frequency: 2782 },
    { letter: "14", frequency: 4253 },
    { letter: "15", frequency: 12702 },
    { letter: "15", frequency: 12702 },
    { letter: "16", frequency: 12702 },
    { letter: "17", frequency: 12702 },
    { letter: "18", frequency: 1492 },
    { letter: "19", frequency: 2782 },
    { letter: "20", frequency: 4253 },
    { letter: "21", frequency: 12702 },
    { letter: "22", frequency: 12702 },
    { letter: "23", frequency: 12702 },
    { letter: "24", frequency: 12702 },
    { letter: "25", frequency: 12702 },
    { letter: "26", frequency: 1492 },
    { letter: "27", frequency: 2782 },
    { letter: "28", frequency: 4253 },
    { letter: "29", frequency: 12702 },
    { letter: "30", frequency: 12702 },
    { letter: "31", frequency: 12702 },
  ];
  const config = {
    data,
    xField: "letter",
    yField: "frequency",
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
  const handleChange=()=>{
    
  }
  return (
    <>
      <div className="statistic-revenue">
        <p>Biểu đồ tổng tiền theo tháng</p>
        <Select
          defaultValue={1}
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
