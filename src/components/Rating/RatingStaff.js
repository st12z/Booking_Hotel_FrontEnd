import { Progress } from "antd";

function RatingStaff({ value }) {
  return (
    <>
      <h3>Nhân viên</h3>
      <Progress
        percent={(value / 10) * 100}
        status="active"
        format={() => `${value.toFixed(1)}`} 
      />
    </>
  );
}
export default RatingStaff;
