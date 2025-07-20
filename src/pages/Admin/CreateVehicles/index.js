import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  notification,
  Rate,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTripTypeById,
  updateTripType,
} from "../../../service/RoomService/TripTypeService";
import {
  createVehicle,
  getAllCarStatus,
  getAllCarTypes,
  getVehiclesById,
  updateVehicle,
} from "../../../service/BookingService/VehicleService";

function CreateVehicles() {
  const [dataCarTypes, setDataCarTypes] = useState([]);
  const [dataCarStatus, setDataCarStatus] = useState([]);
  const [vehicle, setVehicle] = useState();
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
        const resDataCarTypes = await getAllCarTypes();
        const resDataCarStatus = await getAllCarStatus();
        if (resDataCarTypes.code == 200) {
          const carTypes = Object.entries(resDataCarTypes.data).map(
            ([label, value]) => ({
              label,
              value,
            })
          );
          console.log("CarTypes:", carTypes);
          setDataCarTypes(carTypes);
        }
        if (resDataCarStatus.code == 200) {
          const carStatus = Object.entries(resDataCarStatus.data).map(
            ([label, value]) => ({
              label,
              value,
            })
          );
          console.log("CarStatus:", carStatus);
          setDataCarStatus(carStatus);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
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
      formData.append("vehicle", JSON.stringify(data));
      formData.append("file", file);
      const res = await createVehicle( formData);
      console.log(res);
      if (res.code == 200) {
        openNotification("topRight", "Tạo mới vehicle thành công!", "green");
      } else {
        openNotification("topRight", "Tạo mới vehicle thất bại!", "red");
      }
    } catch (error) {
      console.error(error);
      openNotification("topRight", "Tạo mới vehicle thất bại!", "red");
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
          label={<h3 style={{ color: "#0057B8" }}>Tên biển số</h3>}
          name="licensePlate"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập biển số!",
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
          label={<h3 style={{ color: "#0057B8" }}>Phần trăm giảm giá</h3>}
          name="discount"
          rules={[
            {
              required: true,
              message: "Vui lòng giảm giá!",
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Số lượng</h3>}
          name="quantity"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số lượng!",
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Giá xe</h3>}
          name="price"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá xe!",
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Loại phương tiện</h3>}
          name="carType"
          rules={[
            { required: true, message: "Vui lòng chọn loại phương tiện!" },
          ]}
        >
          <Select options={dataCarTypes} />
        </Form.Item>
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Trạng thái phương tiện</h3>}
          name="status"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Select options={dataCarStatus} />
        </Form.Item>
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Xếp hạng</h3>}
          name="star"
          rules={[
            { required: true, message: "Vui lòng chọn loại phương tiện!" },
          ]}
        >
          <Rate  />
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
export default CreateVehicles;
