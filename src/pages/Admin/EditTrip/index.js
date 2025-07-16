import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTripById,
  updateTrip,
} from "../../../service/RoomService/TripService";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  notification,
  Select,
} from "antd";
import { getAllCities } from "../../../service/RoomService/CityService";
import { getAllTripTypes } from "../../../service/RoomService/TripTypeService";

function EditTrip() {
  const params = useParams();
  const tripId = params.id;
  const [form] = Form.useForm();
  const [file, setFile] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [errorImage, setErrorImage] = useState(false);
  const [trip, setTrip] = useState();
  const [dataTripTypes, setDataTripTypes] = useState([]);
  const [dataCities, setDataCities] = useState([]);
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
        const res = await getTripById(tripId);
        const resTripTypes = await getAllTripTypes();
        const resCities = await getAllCities();
        console.log("resCities", resCities);
        console.log("resTripTypes", resTripTypes);
        console.log("res", res);
        if (resCities.code == 200) {
          const dataCities = resCities.data.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          setDataCities(dataCities);
        }
        if (resTripTypes.code == 200) {
          const dataTripTypes = resTripTypes.data.map((item) => ({
            label: item.tripType,
            value: item.tripType,
          }));
          console.log(resTripTypes);
          setDataTripTypes(dataTripTypes);
        }
        if (res.code === 200) {
          setTrip(res.data);
          form.setFieldsValue(res.data);
          const imageUrl = res.data.image;
          setPreviewImage(imageUrl);
          if (imageUrl) {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const filename = imageUrl.split("/").pop() || "image.jpg";
            const fileFromUrl = new File([blob], filename, { type: blob.type });
            setFile(fileFromUrl);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [tripId]);
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
      const data=e;
      const formData = new FormData();
      formData.append("trip", JSON.stringify(data));
      formData.append("file", file);
      const res = await updateTrip(tripId,formData);
      console.log(res);
      if(res.code==200){
        openNotification("topRight","Cập nhật trip thành công!","green");
      }
      else{
        openNotification("topRight","Cập nhật trip thất bại!","red");
      }
    } catch (error) {
      console.error(error);
      openNotification("topRight","Cập nhật trip thất bại!","red");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      {trip && (
        <Form
          layout="vertical"
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label={<h3 style={{ color: "#0057B8" }}>Tên địa điểm</h3>}
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
          <h3 style={{ color: "#0057B8" }}>Ảnh</h3>
          <div className="image" style={{ marginBottom: "20px" }}>
            <Image src={previewImage} />
          </div>
          <input type="file" accept="*" onChange={handleChangeImage} />
          {errorImage && <h4 style={{ color: "red" }}>Vui lòng upload ảnh</h4>}
          <Form.Item
            label={<h3 style={{ color: "#0057B8" }}>Vĩ độ</h3>}
            name="latitude"
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
            name="longitude"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập kinh độ!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label={<h3 style={{ color: "#0057B8" }}>Loại điểm đến</h3>}
            name="tripType"
            rules={[
              { required: true, message: "Vui lòng chọn loại điểm đến!" },
            ]}
          >
            <Select options={dataTripTypes} />
          </Form.Item>
          <Form.Item
            label={<h3 style={{ color: "#0057B8" }}>Thành phố</h3>}
            name="city_id"
            rules={[{ required: true, message: "Vui lòng chọn thành phố!" }]}
          >
            <Select options={dataCities} />
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
      )}
    </>
  );
}
export default EditTrip;
