import { Button, Card, Flex, Input, notification, Typography } from "antd";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCheckOtp } from "../../service/PaymentService/payment";
import { confirmBooking } from "../../service/BookingService/BookingService";
const { Title } = Typography;
function BookingCheckOtp() {
  const [disabled, setDisabled] = useState(true);
  const [otp, setOtp] = useState();
  const [params] = useSearchParams();
const uniqueCheck = params.get("uniqueCheck");
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
  console.log(params);
  const onChange = (text) => {
    console.log("onChange:", text);
  };
  const onInput = (value) => {
    if(value.length==6) setDisabled(false);
    setOtp(value.join(""));
    console.log("onInput:", value);
  };
  const handleClick = async () => {
    try {
      const res = await getCheckOtp(otp, uniqueCheck);
      if (res.code == 200) {
        if (res.data == true) {
          const resConfirmBooking = await confirmBooking(uniqueCheck);
          console.log(resConfirmBooking);
          window.open(resConfirmBooking.data, "_self");
        }
        else{
          openNotification("topRight","OTP nhập sai hoặc không hợp lệ!","red")
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const sharedProps = {
    onChange,
    onInput,
  };
  return (
    <>
      {contextHolder}
      <div className="" style={{ display: "flex", justifyContent: "center" }}>
        <Card
          title="Nhập mã OTP"
          variant="borderless"
          style={{ width: 300, height: 300 }}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <Input.OTP length={6} {...sharedProps} />
            <Button disabled={disabled} onClick={handleClick} type="primary">
              Xác nhận
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
export default BookingCheckOtp;
