import { Button, Form, Image, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createTripType } from "../../../service/RoomService/TripTypeService";

function CreateTripType() {
  const [form] = Form.useForm();
  const [file, setFile] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
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
    console.log(e);
    if (!previewImage) {
      setErrorImage(true);
      return;
    }
    try {
      setLoading(true);
      const data = e;
      const formData = new FormData();
      formData.append("tripType", JSON.stringify(data));
      formData.append("file", file);
      const res = await createTripType(formData);
      console.log(res);
      if (res.code == 200) {
        openNotification("topRight", "Tạo mới trip-type thành công!", "green");
      } else {
        openNotification("topRight", "Tạo mới trip-type thất bại!", "red");
      }
    } catch (error) {
      console.error(error);
      openNotification("topRight", "Tạo mới trip-type thất bại!", "red");
    } finally {
      setLoading(false);
      form.resetFields();
      setPreviewImage("");
      setErrorImage(false);
      setFile(null);
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
          label={<h3 style={{ color: "#0057B8" }}>Tên loại địa điểm</h3>}
          name="tripType"
          rules={[
            {
              required: true,
              message: "Vui lòng  nhập họ tên!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <h3 style={{ color: "#0057B8" }}>Ảnh</h3>
        <div className="image" style={{ marginBottom: "20px" }}>
          <Image src={previewImage} />
        </div>
        <input type="file" accept="*" onChange={handleChangeImage} />
        {errorImage && <h4 style={{ color: "red" }}>Vui lòng upload ảnh</h4>}
        <Button
          htmlType="submit"
          type="primary"
          style={{ marginTop: "20px" }}
          loading={loading}
        >
          Tạo mới
        </Button>
      </Form>
    </>
  );
}
export default CreateTripType;
