import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomTypeById, updateRoomType } from "../../../service/RoomService/RoomTypeService";
import { Button, Form, Input, InputNumber, notification, Select } from "antd";
import { getFacilities } from "../../../service/RoomService/FacilityService";

function EditRoomType() {
  const params = useParams();
  const roomTypeId = params.id;
  const [roomType, setRoomType] = useState({});
  const [form] = Form.useForm();
  const [allFacilities, setAllFacilites] = useState();
  const [api, contextHolder] = notification.useNotification();
  const [freeServices, setFreeServices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomNumber, setRoomsNumber] = useState();
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
        const res = await getRoomTypeById(roomTypeId);
        const resFacilities = await getFacilities();
        console.log(res);
        if (res.code == 200) {
          setRoomType(res.data);
          const rooms = res.data.rooms.map(item=>item.roomNumber);
          const freeServices = res.data.freeServices.map(item1=>{
            const findService = resFacilities.data.find(item2=>item2.name==item1);
            return findService.id;
          });
          console.log("freeServices",freeServices);
          setFreeServices(freeServices);
          setRooms(rooms);
          form.setFieldsValue(res.data);
        } else {
          console.error("Failed to fetch room type");
        }
        if (resFacilities.code == 200) {
          const facilitiesOptions = resFacilities.data.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          console.log("facilities:",facilitiesOptions);
          setAllFacilites(facilitiesOptions);
        }
      } catch (error) {
        console.error("Error fetching room type:", error);
      }
    };
    fetchApi();
  }, [roomTypeId]);
  const handleChangeFreeServices = (value) => {
    console.log(value);
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
  const handleDeleteRoom = (value) => {
    console.log(value);
    const newRooms = rooms.filter((item) => item !== value);
    console.log(newRooms);
    setRooms(newRooms);
  };
  const handleSubmit = async (e) => {
    const data={
      ...e,
      freeServices:freeServices,
      rooms: rooms,
      propertyId: roomType.propertyId
    };
    try{
      const res = await updateRoomType(roomTypeId,data);
      if(res.code==200){
        openNotification("topRight","Cập nhật thành công!","green");
      }
      else{
        openNotification("topRight","Cập nhật thất bại!","red");
      }
    }catch(error){
      openNotification("topRight","Cập nhật thất bại!","red");
      console.error(error);
    }

  };
  return (
    <>
      {contextHolder}
      <h2>Chỉnh sửa loại phòng</h2>
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
        <div className="add-room" style={{ marginBottom: "10px" }}>
          <h3>Danh sách phòng đã thêm:</h3>
          {rooms.length > 0 && (
            <div className="rooms-list">
              <ul>
                {rooms.map((room, index) => (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <li key={index}>Phòng số: {room}</li>
                    <button onClick={() => handleDeleteRoom(room)}>Xoá</button>
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
        <Button type="primary" htmlType="submit">
          Cập nhật
        </Button>
      </Form>
    </>
  );
}
export default EditRoomType;
