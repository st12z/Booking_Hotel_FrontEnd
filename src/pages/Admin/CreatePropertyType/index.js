import { Button, Form, Input, notification } from "antd";
import { createPropertyType } from "../../../service/RoomService/PropertyTypeService";

function CreatePropertyType() {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
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
  const handleSubmit = async (e) => {
    try {
      const res = await createPropertyType(e);
      if (res.code == 200) {
        openNotification(
          "topRight",
          "Tạo mới property-type thành công!",
          "green"
        );
      } else {
        openNotification("topRight", "Tạo mới property-type thất bại!", "red");
      }
    } catch (error) {
      openNotification("topRight", "Tạo mới property-type thất bại!", "red");
      console.error(error);
    }finally{
      form.resetFields();
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Tên loại khách sạn</h3>}
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng tên loại!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button htmlType="submit" type="primary" style={{ marginTop: "20px" }}>
          Tạo mới
        </Button>
      </Form>
    </>
  );
}
export default CreatePropertyType;
