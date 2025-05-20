import { Link, useSearchParams } from "react-router-dom";
import PaymentSuccessIcon from "../../images/success-icon.jpg";
import PaymentFailureIcon from "../../images/fail-icon.png";
import "./PaymentCallBack.scss";
import { ContainerOutlined, HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { connectStomp } from "../../utils/connectStomp";
import {
  getAmountBillsToday,
  getAmountRevenueToday,
  getBillByBillCode,
} from "../../service/BookingService/BillService";
function PaymentCallBack() {
  const [searchParams] = useSearchParams();
  const billCode = searchParams.get("billCode");
  const status = searchParams.get("status");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await getBillByBillCode(billCode);
        connectStomp("/app/sendNotification", {
          content: `${user.email} đã hoàn thành hóa đơn ${billCode}!`,
        });
        connectStomp(
          "/app/sendAmountBillsToday",
          `Hoá đơn ${billCode} đã được thanh toán thàn công!`
        );
        connectStomp("/app/sendAmountRevenueToday", res.data.newTotalPayment);
      } catch (error) {
        console.error(error);
      }
    };
    if(status==200) fetchBills();
  }, []);
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
                <Link to={`/bills/${billCode}`}>Xem chi tiết hóa đơn</Link>
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
