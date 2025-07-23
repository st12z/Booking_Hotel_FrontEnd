import {Button, Col, Row} from "antd";
import { urlRedirectLogin } from "../../utils/variable"; 
function Login(){
  const handleClick = ()=>{
    window.location.href = urlRedirectLogin;
  }
  return(
    <>
      <Row justify="center">
        <Col span={12} justify="center" style={{textAlign:"center"}}>
        <Button type="primary" onClick={handleClick}>
          Đăng nhập bằng Keycloak
        </Button>
        </Col>
      </Row>
    </>
  )
}
export default Login;