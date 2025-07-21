import { Button, Form, Input, notification } from "antd";
import { createRole } from "../../../service/UserService/RoleService";

function CreateRole() {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
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
  const handleSubmit =async (e) => {
    const data=e;
    console.log(data);
    try{
      const res = await createRole(data);
      if(res.code==200){
        openNotification("topRight","Tạo mới thành công","green");
      }
      else{
        openNotification("topRight","Tạo mới thất bại","red");
      }
    }catch(error){
      openNotification("topRight","Tạo mới thất bại","red");
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
          label={<h3 style={{ color: "#0057B8" }}>Tên role</h3>}
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng  nhập họ tên!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          style={{ marginTop: "20px" }}
        >
          Cập nhật
        </Button>
      </Form>
    </>
  );
}
export default CreateRole;
