import { useSelector } from "react-redux";
import "./BookingCustomerDetail.scss";
import { Button, Col, Form, Input, Radio, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
function BookingCustomerDetail() {
  const user = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    console.log(e);
  };
  const style = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };
  return (
    <>
      {user && (
        <div className="booking-customer">
          <Form onFinish={handleSubmit}>
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
                  <Form.Item
                    name="bookingForWho"
                  >
                    <Radio.Group
                      style={style}
                      options={[
                        { value: 1, label: "Đặt phòng cho cá nhân." },
                        { value: 2, label: "Đặt phòng cho người khác." },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div className="">
                  <h2>Bạn đặt phòng cho công việc ?</h2>
                  <Form.Item
                    name="isBusinessTrip"
                  >
                    <Radio.Group
                      style={style}
                      options={[
                        { value: 1, label: "Đúng." },
                        { value: 2, label: "Không." },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="info-service">
                <div className="">
                  <h2>Bạn có muốn dịch vụ xe đưa đón ?</h2>
                  <Form.Item
                    name="isShuttleService"
                  >
                    <Radio.Group
                      
                      style={style}
                      options={[
                        { value: 1, label: "Có." },
                        { value: 2, label: "Không." },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="info-request">
                <div className="">
                  <h2>Bạn có muốn gửi lời nhắn không ?</h2>
                  <Form.Item
                    name="specialMessage"
                  >
                    <TextArea rows={4}/>
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="booking-customer__footer">
              <Row>
                <Col span={24} style={{ textAlign: "center" }}>
                  <Button type="primary" htmlType="submit">
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
