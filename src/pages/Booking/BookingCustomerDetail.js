import { useSelector } from "react-redux";
import "./BookingCustomerDetail.scss";
import { Button, Col, Form, Input, notification, Radio, Row, Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";
import ServiceCar from "../../components/ServiceCar";
import { useContext, useState } from "react";
import { Context } from ".";
import { checkBookingVehicle } from "../../service/BookingService/VehicleService";
import { checkBookingRooms } from "../../service/RoomService/RoomTypeService";
import { confirmBooking } from "../../service/BookingService/BookingService";
function BookingCustomerDetail() {
  const user = useSelector((state) => state.user);
  const { form } = useContext(Context);
  const { priceCar } = useContext(Context);
  const [loading, setLoading] = useState(false);
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
  form.setFieldsValue({
    priceCar: priceCar,
    userEmail: user.email,
  });
  const style = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };
  // check lại đặt chỗ xe
  const checkBookingCar = async (data) => {
    try {
      const res = await checkBookingVehicle(data);
      if (res.code != 200) {
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  // check lại đặt phòng khách sạn
  const checkBookingHotel = async (data) => {
    try{
      const res = await checkBookingRooms(data);
      console.log(res);
      if (res.code != 200) {
        return false;
      }
      return true;
    }catch(err){
      console.error(err);
      return false;
    }
  }
  // thanh toán
  const handlePayment = async(e)=>{
    try{
      const res = await confirmBooking(e);
      window.open(res.data, "_blank");
    }catch(err){
      console.error(err);
    }
  }
  const handleSubmit =  (e) => {
    console.log(e);
    setLoading(true);
    setTimeout(async() => {
      let checkCar=true;
      if(priceCar !=0){
        checkCar=await checkBookingCar(e);
        if(!checkCar){
          openNotification("topRight", "Đặt xe thất bại!", "red");
        }
      }
      const checkHotel=await checkBookingHotel(e);
      if(!checkHotel){
        openNotification("topRight", "Đặt phòng thất bại!", "red");
      }
      if(checkCar && checkHotel){
        handlePayment(e);
      }
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      {contextHolder}
      {user && (
        <div className="booking-customer">
          <Form onFinish={handleSubmit} form={form}>
            {/* Thông tin hoá đơn đặt thêm vào form  */}
            <Form.Item name="discountHotel" hidden />
            <Form.Item name="discountCar" hidden />
            <Form.Item name="pricePromotion" hidden />
            <Form.Item name="originTotalPayment" hidden />
            <Form.Item name="newTotalPayment" hidden />
            <Form.Item name="priceCar" hidden />
            <Form.Item name="propertyId" hidden />
            <Form.Item name="userEmail" hidden />
            {/* Thông tin hoá đơn thêm vào form  */}
            {/* Thông tin các phòng được đặt thêm vào form */}
            <Form.Item name="roomTypes" hidden />
            {/* Thông tin các phòng được đặt thêm vào form */}
            {/* Thông tin các phiếu giảm giá được đặt thêm vào form */}
            <Form.Item name="discountCarId" hidden />
            <Form.Item name="discountHotelId" hidden />
            {/* Thông tin các phiếu giảm giá được đặt thêm vào form */}
            <div className="booking-customer__header">
              <p>Thông tin liên lạc</p>
            </div>
            <div className="booking-customer__body">
              <div className="info-customer">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item
                      name="firstName"
                      label="Họ"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập họ!",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      label="Tên"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên!",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          type: "email",
                          message: "Nhập email không đúng định dạng!",
                        },
                        {
                          required: true,
                          message: "Vui lòng nhập email!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="phoneNumber"
                      label="Số điện thoại"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại!",
                        },
                        {
                          pattern: /^\d{10}$/,
                          message: "Số điện thoại phải gồm đúng 10 chữ số!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="district"
                      label="Huyện"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên huyện!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="city"
                      label="Thành phố"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên thành phố!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="country"
                      label="Quốc gia"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên quốc gia!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="addressDetail" label="Địa chỉ cụ thể">
                      <TextArea rows={4} />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
              <div className="info-optional">
                <div className="">
                  <h2>Bạn đặt phòng cho ai ?</h2>
                  <Form.Item name="bookingForWho">
                    <Radio.Group
                      required={true}
                      style={style}
                      options={[
                        { value: 1, label: "Đặt phòng cho cá nhân." },
                        { value: 0, label: "Đặt phòng cho người khác." },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div className="">
                  <h2>Bạn đặt phòng cho công việc ?</h2>
                  <Form.Item name="isBusinessTrip">
                    <Radio.Group
                      required={true}
                      style={style}
                      options={[
                        { value: 1, label: "Đúng." },
                        { value: 0, label: "Không." },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div>
                <ServiceCar />
              </div>
              <div className="info-request">
                <div className="">
                  <h2>Bạn có muốn gửi lời nhắn không ?</h2>
                  <Form.Item name="specialMessage">
                    <TextArea rows={4} />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="booking-customer__footer">
              <Row>
                <Col span={24} style={{ textAlign: "center" }}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Xác nhận
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}
export default BookingCustomerDetail;
