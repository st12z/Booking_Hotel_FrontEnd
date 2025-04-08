import {Button} from "antd";
import { urlRedirectLogin } from "../../utils/redirectLogin";
function Login(){
  const handleClick = ()=>{
    window.location.href = urlRedirectLogin;
  }
  return(
    <>
      <Button type="primary" onClick={handleClick}>
        Đăng nhập bằng keycloak
      </Button>
    </>
  )
}
export default Login;