import { Progress } from "antd";

function RatingFacilities({value}){
  return(
    <>
      <h3>Tiện tích</h3>
      <Progress
        percent={(value / 10) * 100} 
        status="active"
        format={() => `${value.toFixed(1)}`} 
      />
    </>
  )
}
export default RatingFacilities;