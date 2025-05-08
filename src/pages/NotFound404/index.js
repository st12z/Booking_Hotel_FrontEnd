import { Button, Result } from "antd";
import { Link } from "react-router-dom";

function NotFound404(){
  return(
    <>
      <Result
        status="404"
        title="404"
        subTitle="Trang không tồn tại."
        extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
      />
    </>
  )
}
export default NotFound404;