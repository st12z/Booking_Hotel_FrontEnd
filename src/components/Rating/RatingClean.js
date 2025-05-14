import { Progress } from "antd";

function RatingClean({ value }) {
  return (
    <>
      <h3>Sạch sẽ</h3>
      <Progress
        percent={(value / 10) * 100} 
        status="active"
        format={() => `${value.toFixed(1)}`} 
      />
    </>
  );
}
export default RatingClean;
