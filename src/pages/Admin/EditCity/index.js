import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCityById,
  updateCity,
} from "../../../service/RoomService/CityService";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  notification,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
function EditCity() {
  const params = useParams();
  const cityId = params.id;
  const [form] = Form.useForm();
  const [city, setCity] = useState();
  const rules = [{ required: true, message: "Vui lòng nhập trường này!" }];
  const [file, setFile] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [errorImage,setErrorImage] = useState(false);
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
        const res = await getCityById(cityId);
        if (res.code == 200) {
          setPreviewImage(res.data.image);
          form.setFieldsValue(res.data);
          setCity(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [cityId]);
  const handleChangeImage = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      const imageUrl = URL.createObjectURL(selected);
      setPreviewImage(imageUrl);
    }
  };
  const handleSubmit = async (e) => {
    if(!previewImage){
      setErrorImage(true);
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", e.name);
      formData.append("image", file);
      const res = await updateCity(cityId, formData);
      if ((res.code = 200)) {
        openNotification("topRight","Cập nhật thành công!","green");
        setErrorImage(false);
      }
      else{
        openNotification("topRight","Cập nhật thất bại!","red");
      }
    } catch (error) {
      console.error(error);
      openNotification("topRight","Cập nhật thất bại!","red");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      <h2>Chỉnh sửa thành phố</h2>
      {city && (
        <Form
          layout="vertical"
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label={<h3 style={{ color: "#0057B8" }}>Tên thành phố</h3>}
            name="name"
            rules={rules}
          >
            <Input />
          </Form.Item>
          <h3 style={{ color: "#0057B8" }}>Ảnh</h3>
          <div className="image" style={{ marginBottom: "20px" }}>
            <Image src={previewImage}  />
          </div>
          <input type="file" accept="*" onChange={handleChangeImage} />
          {errorImage && (
            <h4 style={{color:"red"}}>Vui lòng upload ảnh</h4>
          )}
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
export default EditCity;
