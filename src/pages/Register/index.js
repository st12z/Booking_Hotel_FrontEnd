import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Radio,
  Row,
} from "antd";
import moment from "moment";
import { useState } from "react";
import {
  createRoomChats,
  getAmountUsers,
  registerUser,
} from "../../service/UserService/AuthService";
import { connectStomp } from "../../utils/connectStomp";
function Register() {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading,setLoading]=useState(false);
  const openNotification = (placement, message, color) => {
    api.info({
      message: `Thông báo`,
      description: (
        <span style={{ color: color, fontSize: "20px", fontWeight: 600 }}>
          {message}
        </span>
      ),
      placement,
    });
  };
  const rules = [
    {
      required: true,
      message: "Vui lòng nhập đầy đủ !",
    },
  ];
  const handleSubmit = (e) => {
    setLoading(true);
    
    e.birthDay = moment(e.birthDay).format("YYYY-MM-DD");
    const data = {
      email: e.email,
      password: e.password,
      firstName: e.firstName,
      lastName: e.lastName,
      phoneNumber: e.phoneNumber,
      birthDay: e.birthDay,
      gender: e.gender,
      village: e.village,
      district: e.district,
      city: e.city,
      address: e.address,
      avatar:
        "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg",
    };
    const fetchApi = async () => {
      try {
        const res = await registerUser(data);
        console.log(res);
        if (res.code === 201) {
          openNotification("topRight", "Đăng ký thành công!", "green");
          connectStomp("/app/sendAmountUsers", `Tài khoản ${data.email} đăng kí thành công`);
          connectStomp("/app/sendNotification",{content: `Tài khoản ${data.email} đăng kí thành công`});
          form.resetFields();
          
          const roomData = {
            userAId: res.data.id,
          };
          const resRoomChats = await createRoomChats(roomData);
          console.log(resRoomChats);
        } else {
          openNotification("topRight", "Đăng ký không thành công!", "red");
        }
      } catch (error) {
        console.error("Error:", error);
        openNotification("topRight", "Đăng ký không thành công!", "red");
      }finally{
        form.resetFields();
        setLoading(false);
      }
    };
    fetchApi();
    
  };

  return (
    <>
      {contextHolder}
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col span={16}>
          <Card title="Đăng ký" bordered={false} style={{ width: "100%" }}>
            <Form onFinish={handleSubmit} form={form}>
              <Row>
                <Col span={12}>
                  <Form.Item label="Họ tên" name="firstName" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tên" name="lastName" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label="Thành phố" name="city" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Huyện" name="district" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Thôn" name="village" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={rules}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Địa chỉ chi tiết"
                    name="address"
                    rules={rules}
                  >
                    <Input.TextArea rows={4} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Giới tinh"
                    name="gender"
                    rules={[
                      { required: true, message: "Vui lòng chọn giới tính!" },
                    ]}
                  >
                    <Radio.Group
                      options={[
                        { value: "Nam", label: "Nam" },
                        { value: "Nữ", label: "Nữ" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Ngày sinh"
                    name="birthDay"
                    rules={[
                      { required: true, message: "Vui lòng chọn ngày sinh!" },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Vui lòng nhập đúng email!",
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
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập password ít nhất 6 kí tự",
                        min: 6,
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Confirm Password"
                    name="confirm_password"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The new password that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                    hasFeedback
                    dependencies={["password"]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col span={24} style={{ justifyItems: "center" }}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Đăng kí
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default Register;
