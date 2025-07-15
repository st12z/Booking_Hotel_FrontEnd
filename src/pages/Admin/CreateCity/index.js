import { Button, Form, Image, Input, InputNumber, notification } from "antd";
import { useState } from "react";
import { createCity } from "../../../service/RoomService/CityService";

function CreateCity() {
  const [file, setFile] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [errorImage, setErrorImage] = useState(false);
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
  const handleChangeImage = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      const imageUrl = URL.createObjectURL(selected);
      setPreviewImage(imageUrl);
    }
  };
  const handleSubmit = async (e) => {
    if (!file) {
      setErrorImage(true);
      return;
    }
    setLoading(true);
    try {
      const data = e;
      console.log(data);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("city", JSON.stringify(data));
      const res = await createCity(formData);
      console.log(res);
      if (res.code == 200) {
        openNotification("topRight", "Tạo mới thành công!", "green");
      } else {
        openNotification("topRight", "Tạo mới thất bại!", "red");
      }
    } catch (error) {
      openNotification("topRight", "Tạo mới thất bại!", "red");
      console.error(error);
    } finally {
      setLoading(false);
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
          label={<h3 style={{ color: "#0057B8" }}>Tên thành phố</h3>}
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <h3 style={{ color: "#0057B8" }}>Ảnh</h3>
        <div className="image" style={{ marginBottom: "20px" }}>
          {previewImage && (
            <Image
              src={previewImage}
              style={{
                width: "300px",
                height: "400px", // hoặc để auto nếu muốn theo tỉ lệ gốc
                objectFit: "cover", // hoặc 'contain' nếu muốn toàn bộ ảnh nằm trong khung
                borderRadius: "8px",
              }}
            />
          )}
        </div>
        <input type="file" accept="*" onChange={handleChangeImage} />
        {errorImage && <h4 style={{ color: "red" }}>Vui lòng upload ảnh</h4>}
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Vĩ độ</h3>}
          name="latitudeCenter"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập vĩ độ!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Kinh độ</h3>}
          name="longitudeCenter"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập kinh độ!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          style={{ marginTop: "20px" }}
          loading={loading}
        >
          Cập nhật
        </Button>
      </Form>
    </>
  );
}
export default CreateCity;
