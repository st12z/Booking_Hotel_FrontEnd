import { Button, Form, Input, InputNumber, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { getFacilities } from "../../service/RoomService/FacilityService";
import { useNavigate, useParams } from "react-router-dom";
import { createRoomType } from "../../service/RoomService/RoomTypeService";

function CreateRoomType() {
  const [allFacilities, setAllFacilities] = useState([]);
  const [freeServices, setFreeServices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomNumber, setRoomsNumber] = useState();
  const params = useParams();
  const propertyId = params.id;
  const nav = useNavigate();
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
      freeServices: freeServices,
      propertyId: parseInt(propertyId),
      rooms: rooms,
    };
    console.log(data);
    try {
      const res = await createRoomType(data);
      console.log(res);
      if (res.code == 200) {
        openNotification("topRight", "Tạo loại phòng thành công!", "green");
      } else {
        openNotification("topRight", "Tạo loại phòng thất bại!", "red");
      }
    } catch (error) {
      openNotification("topRight", "Tạo loại phòng thất bại!", "red");
      console.error(error);
    } finally {
      form.resetFields();
      setFreeServices([]);
      setRooms([]);
    }
  };
  const handleChangeFreeServices = (value) => {
    setFreeServices(value);
  };
  const handleAddRooms = () => {
    if(!roomNumber){
      openNotification("topRight","Phòng không hợp lệ!","red");
      return;
    }
    const existRoom = rooms.find((item) => item == roomNumber);
    if (existRoom) {
      openNotification("topRight", "Phòng đã tồn tại!", "red");
      return;
    }
    setRooms([...rooms, roomNumber]);
  };
  const handleDeleteRoom=(value)=>{
    console.log(value);
    const newRooms = rooms.filter((item)=>item!==value);
    console.log(newRooms);
    setRooms(newRooms);
  }
  return (
    <>
      {contextHolder}
      <h2>Thêm loại phòng</h2>
      <Form
        layout="vertical"
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
        form={form}
      >
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
              message: "Giá trị phải từ 0!",
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
            value={freeServices}
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={handleChangeFreeServices}
            options={allFacilities}
          />
        </Form.Item>
        <div className="add-room" style={{ marginBottom: "10px" }}>
          <h3>Danh sách phòng đã thêm:</h3>
          {rooms.length > 0 && (
            <div className="rooms-list">
              <ul>
                {rooms.map((room, index) => (
                  <div style={{display:"flex",gap:"10px",marginBottom:"10px"}}>
                    <li key={index}>Phòng số: {room}</li>
                    <button onClick={()=>handleDeleteRoom(room)}>Xoá</button>
                  </div>
                ))}
              </ul>
            </div>
          )}
          <InputNumber
            placeholder="Số phòng"
            onChange={(value) => setRoomsNumber(value)}
          />
          <Button onClick={handleAddRooms}>Thêm</Button>
        </div>

        <Button type="primary" htmlType="submit">
          Tạo loại phòng
        </Button>
      </Form>
    </>
  );
}
export default CreateRoomType;
