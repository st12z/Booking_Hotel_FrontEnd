import { Progress } from "antd";

function RatingLocation({ value }) {
  return (
    <>
      <h3>Vị trí</h3>
      <Progress
        percent={(value / 10) * 100} 
        status="active"
        format={() => `${value.toFixed(1)}`} 
      />
    </>
  );
}
export default RatingLocation;
