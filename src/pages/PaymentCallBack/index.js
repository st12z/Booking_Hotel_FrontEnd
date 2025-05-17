import { Link, useSearchParams } from "react-router-dom";
import PaymentSuccessIcon from "../../images/success-icon.jpg";
import PaymentFailureIcon from "../../images/fail-icon.png";
import "./PaymentCallBack.scss";
import { ContainerOutlined, HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { connectStomp } from "../../utils/connectStomp";
import { getAmountBills, getAmountRevenueToday } from "../../service/BookingService/BillService";
function PaymentCallBack() {
  const [searchParams] = useSearchParams();
  const billCode = searchParams.get("billCode");
  const status = searchParams.get("status");
  const user = useSelector((state) => state.user);
  const fetchBills = async()=>{
      try{
        const res= await getAmountBills();
        if(res.code==200){
          connectStomp("/app/sendAmountBills",  res.data );
        }
      }catch(error){
        console.error(error);
      }
  }
  const fetchAmountRevenue=async()=>{
    try{
      const res = await getAmountRevenueToday();
      if(res.code==200){
        connectStomp("/app/sendAmountRevenueToday",res.data);
      }
    }catch(error){
      console.error(error);
    }
  }
  useEffect(() => {
    
    // Kết nối
    if(status==200){
      fetchBills();
      fetchAmountRevenue();
      connectStomp("/app/sendNotification",{content:`${user.email} đã hoàn thành hóa đơn ${billCode}!`});
      
    }
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
