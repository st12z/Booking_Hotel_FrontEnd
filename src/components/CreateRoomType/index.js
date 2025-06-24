import { Button, Form, Input, InputNumber, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { getFacilities } from "../../service/RoomService/FacilityService";
import { useNavigate, useParams } from "react-router-dom";
import { createRoomType } from "../../service/RoomService/RoomTypeService";

function CreateRoomType() {
  const [allFacilities, setAllFacilities] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const params = useParams();
  const propertyId = params.id;
  const nav = useNavigate();
  const [api, contextHolder] = notification.useNotification();
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
        const res = await getFacilities();
        if (res.code === 200) {
          const facilitiesOptions = res.data.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setAllFacilities(facilitiesOptions);
        }
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };
    fetchApi();
  }, []);
  const handleSubmit = async (e) => {
    const data = {
      ...e,
      facilities: facilities,
      propertyId: parseInt(propertyId),
    };
    console.log(data);
    try {
      const res = await createRoomType(data);
      console.log(res);
      if (res.code == 200) {
        openNotification("top", "Tạo loại phòng thành công!", "green");
        nav(`/admin/properties/edit/${propertyId}`);
      } else {
        openNotification("top", "Tạo loại phòng thất bại!", "red");
      }
    } catch (error) {
      openNotification("top", "Tạo loại phòng thất bại!", "red");
      console.error(error);
    }
  };
  const handleChangeFacilities = (value) => {
    setFacilities(value);
  };
  return (
    <>
      {contextHolder}
      <h2>Thêm loại phòng</h2>
      <Form layout="vertical" style={{ maxWidth: 600 }} onFinish={handleSubmit}>
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Tên loại phòng</h3>}
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên loại phòng!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Giá phòng</h3>}
          name="price"
          rules={[
            { required: true, message: "Vui lòng nhập giá!" },
            {
              type: "number",
              min: 0,
              message: "Giá trị nhỏ nhất từ 0",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Số lượng tối đa người</h3>}
          name="maxGuests"
          rules={[
            { required: true, message: "Vui lòng nhập số lượng!" },
            {
              type: "number",
              min: 1,
              max: 10,
              message: "Giá trị phải từ 1 đến 10!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Số lượng tối đa giường</h3>}
          name="numBeds"
          rules={[
            { required: true, message: "Vui lòng nhập số lượng!" },
            {
              type: "number",
              min: 1,
              max: 6,
              message: "Giá trị phải từ 1 đến 6!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Phần trăm giảm giá</h3>}
          name="discount"
          rules={[
            { required: true, message: "Vui lòng nhập phần trăm giảm giá!" },
            {
              type: "number",
              min: 0,
              max: 1,
              message: "Giá trị phải từ 0 đến 1!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={<h3 style={{ color: "#0057B8" }}>Diện tích phòng</h3>}
          name="area"
          rules={[
            { required: true, message: "Vui lòng nhập diện tích phòng!" },
            {
              type: "number",
              min: 0,
              max: 50,
              message: "Giá trị phải từ 0 đến 50!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label={<h3 style={{ color: "#0057B8" }}>Tiện ích</h3>}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={handleChangeFacilities}
            options={allFacilities}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Tạo loại phòng
        </Button>
      </Form>
    </>
  );
}
export default CreateRoomType;
