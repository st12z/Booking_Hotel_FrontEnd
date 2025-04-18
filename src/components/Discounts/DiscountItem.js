import { Badge, Button, Card, notification } from "antd";
import { useSelector } from "react-redux";
import { saveDiscount } from "../../service/RoomService/DiscountService";

function DiscountItem(props){
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message, color, onClose) => {
    api.info({
      message: `Thông báo`,
      description: (
        <span style={{ color: color, fontSize: "20px", fontWeight: 600 }}>
          {message}
        </span>
      ),
      placement,
      duration: 5,
    });
  };
  const user = useSelector(state=>state.user);
  const {item}=props;
  const handleSave=(id)=>{
    if(!user){
      openNotification("topRight","Vui lòng đăng nhập để lưu phiếu giảm giá!","red");
    }
    const fetchApi=async()=>{
      const data={
        email:user.email,
        discountId:id
      }
      const res= await saveDiscount(data);
      console.log(res);
      if(res.code==200){
        openNotification("topRight","Lưu phiếu giảm giá thành công!","green");
      }
      else{
        openNotification("topRight","Phiếu giảm giá đã hết!","red");
      }
    }
    fetchApi();
    
  }
  return(
    <>
      {contextHolder}
      <Badge.Ribbon 
      text={`${item.discountType === "PERCENT" 
        ? `${item.discountValue} %` 
        : `${new Intl.NumberFormat('vi-VN').format(item.discountValue)} VNĐ`
      }`} 
      color="red" 
      className="discount__item__badge">
      <div className="discount__item">
        <div className="discount__item__img">
          <img src={item.image} alt="" />
        </div>
        <div className="discount__item__content">
          <h3>{item.code}</h3>
          
          <p><b>Giá tối thiểu:</b> {new Intl.NumberFormat('vi-VN').format(item.minBookingAmount)} VNĐ</p>
          <p><b>Thời gian áp dụng:</b> {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</p>
        </div>
        <div className="discount__item__save">
          <Button type="primary" onClick={()=>handleSave(item.id)}>
            Lưu
          </Button>
        </div>
      </div>
    </Badge.Ribbon>
    </>
    
    
  )
}
export default DiscountItem;