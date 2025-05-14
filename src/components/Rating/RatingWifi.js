import { Progress } from "antd";

function RatingWifi({ value }) {
  return (
    <>
      <h3>Wifi</h3>
      <Progress
        percent={(value / 10) * 100} 
        status="active"
        format={() => `${value.toFixed(1)}`} 
      />
    </>
  );
}
export default RatingWifi;
