import { Link, useSearchParams } from "react-router-dom";
import PaymentSuccessIcon from "../../images/success-icon.jpg";
import PaymentFailureIcon from "../../images/fail-icon.png";
import "./PaymentCallBack.scss";
import { ContainerOutlined, HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
function PaymentCallBack() {
  const [searchParams] = useSearchParams();
  const billCode = searchParams.get("billCode");
  const status = searchParams.get("status");
  return (
    <>
      {status == 200 ? (
        <div className="payment">
          <div className="payment__item">
            <div className="payment__item__header">
              <h2>Thanh toán thành công</h2>
            </div>
            <div className="payment__item__content">
              <img src={PaymentSuccessIcon} alt="" />
            </div>
            <div className="payment__item__footer">
              <Button icon={<ContainerOutlined />}>
                <Link to={`/bill/${billCode}`}>Xem chi tiết hóa đơn</Link>
              </Button>
              <Button icon={<HomeOutlined />}>
                <Link to="/">Trở về trang chủ</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="payment">
          <div className="payment__item">
            <div className="payment__item__header">
              <h2>Thanh toán thất bại</h2>
            </div>
            <div className="payment__item__content">
              <img src={PaymentFailureIcon} alt="" />
            </div>
            <div className="payment__item__footer">
              <Button icon={<HomeOutlined />}>
                <Link to="/">Trở về trang chủ</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default PaymentCallBack;
