import { Progress } from "antd";

function RatingComfort({ value }) {
  return (
    <>
      <h3>Thoải mái</h3>
      <Progress
        percent={(value / 10) * 100} 
        status="active"
        format={() => `${value.toFixed(1)}`} 
      />
    </>
  );
}
export default RatingComfort;
