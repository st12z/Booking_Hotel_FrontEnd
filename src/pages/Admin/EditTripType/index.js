import { Button, Form, Image, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTripTypeById, updateTripType } from "../../../service/RoomService/TripTypeService";

function EditTripType() {
  const params = useParams();
  const id = params.id;
  const [tripType, setTripType] = useState();
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
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getTripTypeById(id);
        if (res.code == 200) {
          const imageIcon = res.data.imageIcon;
          setPreviewImage(imageIcon);
          if (imageIcon) {
            const response = await fetch(imageIcon);
            const blob = await response.blob();
            const filename = imageIcon.split("/").pop() || "image.jpg";
            const fileFromUrl = new File([blob], filename, { type: blob.type });
            setFile(fileFromUrl);
          }
          form.setFieldsValue(res.data);
          setTripType(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [id]);
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
      const res = await updateTripType(id, formData);
      console.log(res);
      if (res.code == 200) {
        openNotification("topRight", "Cập nhật trip-type thành công!", "green");
      } else {
        openNotification("topRight", "Cập nhật trip-type thất bại!", "red");
      }
    } catch (error) {
      console.error(error);
      openNotification("topRight", "Cập nhật trip-type thất bại!", "red");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      {tripType && (
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
            Cập nhật
          </Button>
        </Form>
      )}
    </>
  );
}
export default EditTripType;
