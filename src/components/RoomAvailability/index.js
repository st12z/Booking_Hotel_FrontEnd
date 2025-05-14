import { useEffect, useState } from "react";
import "./RoomAvailability.scss";
import {
  Button,
  Checkbox,
  DatePicker,
  notification,
  Skeleton,
  Table,
  Tag,
} from "antd";
import "./RoomAvailability.scss";
import bed_icon from "../../images/bed-icon.jpg";
import area_icon from "../../images/area-icon.jpg";
import { formatLocalDateTime } from "../../utils/format";
import {
  checkEnoughQuantityRooms,
  getRoomTypesBySearchRequest,
  holdRooms,
} from "../../service/RoomService/RoomTypeService";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

function RoomAvailability(props) {
  const nav = useNavigate();

  const params = useParams();

  const [roomTypes, setRoomTypes] = useState(props.roomTypes);
  const [checkIn, setCheckIn] = useState();

  const [checkOut, setCheckOut] = useState();

  const [quantityBeds, setQuantityBeds] = useState();

  const [searchRequest, setSearchRequest] = useState({});

  const [loading, setLoading] = useState(false);

  const [loadingButtons, setLoadingButtons] = useState([]);

  const [roomChecked, setRoomChecked] = useState([]);

  const [roomReversed, setRoomReversed] = useState([]);

  const [reversedButtonLoading,setReversedButtonLoading] = useState(false);

  const user = useSelector((state) => state.user);

  // Thông tin đã kiểm tra phòng với yêu cầu
  const [checkRequest, setCheckRequest] = useState();
  const [quantityRooms, setQuantityRooms] = useState([
    {
      roomTypeId: -1,
      quantity: -1,
      propertyId: roomTypes.length>0&& roomTypes[0]?.propertyId,
    },
  ]);

  // Thông báo
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
  // xử lý form tìm kiếm
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const searchRequest = {
      checkIn: formatLocalDateTime(e.target[0].value || ""),
      checkOut: formatLocalDateTime(e.target[1].value || ""),
      quantityBeds: e.target[2].value,
    };
    setSearchRequest(searchRequest);
  };

  // Gọi api tìm kiếm phòng theo điều kiện searchRequest
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getRoomTypesBySearchRequest(
          `slugProperty=${params.slug}`,
          searchRequest
        );
        if (res.code == 200) {
          setRoomTypes(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (searchRequest) {
      setTimeout(() => {
        fetchApi();
      }, 1000);
    }
  }, [searchRequest]);

  // Hàm kiểm tra có đủ số lượng phòng để đặt
  const fetchApi = async (id) => {
    console.log(quantityRooms);
    let room = quantityRooms?.find((room) => room.roomTypeId == id);
    if (!room) {
      room = {
        roomTypeId: id,
        quantity: 1,
        propertyId: roomTypes[0].propertyId,
      };
    }
    let checkRequest = {
      ...room,
      checkIn: searchRequest.checkIn ? searchRequest.checkIn : "",
      checkOut: searchRequest.checkOut ? searchRequest.checkOut : "",
      email: user.email,
    };
    setCheckRequest(checkRequest);
    try {
      const res = await checkEnoughQuantityRooms("check-room", checkRequest);
      console.log(checkRequest);
      if (res.code == 200) {
        const data = res.data;
        if (data < checkRequest.quantity) {
          openNotification(
            "topRight",
            `Không đủ số phòng. Số phòng còn lại ${data}!`,
            "red"
          );
        } else {
          openNotification("topRight", `Bạn có thể đặt phòng!`, "green");
          setRoomChecked((prevRoomChecked) => {
            const existRoomChecked = roomChecked.find(
              (item) => item.roomTypeId == id
            );
            if (!existRoomChecked) {
              return [...prevRoomChecked, checkRequest];
            }
            return prevRoomChecked;
          });
          
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Xử lý việc kiểm tra đặt phòng
  const handleCheckRoom = async (index, id) => {
    if (!user.email) {
      openNotification("topRight", "Vui lòng đăng nhập để đặt phòng!", "red");
      return;
    }
    if (!searchRequest || !searchRequest.checkIn || !searchRequest.checkOut) {
      openNotification(
        "topRight",
        "Vui lòng chọn thời gian check-in, check-out!",
        "red"
      );
      return;
    }
    // set trạng thái loading của nút là true
    setLoadingButtons((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    // thời gian chạy loading là false, đồng thời gọi api check
    setTimeout(async () => {
      setLoadingButtons((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
      await fetchApi(id);
    }, 3000);
  };

  // xử lý select chọn số phòng
  const handleQuantityRoomChange = (id, value) => {
    const indexChecked = roomChecked.findIndex((item) => item.roomTypeId == id);
    const indexReversed = roomReversed.findIndex(
      (item) => item.roomTypeId == id
    );
    if (indexChecked !== -1) {
      setRoomChecked(roomChecked.filter((item) => item.roomTypeId !== id));
    }
    if (indexReversed !== -1) {
      setRoomReversed(roomReversed.filter((item) => item.roomTypeId !== id));
    }
    setQuantityRooms((prevQuantityRooms) =>
      prevQuantityRooms.map((room) =>
        room.roomTypeId === id
          ? { ...room, quantity: value }
          : {
              roomTypeId: id,
              quantity: value,
              propertyId: roomTypes[0].propertyId,
            }
      )
    );
  };

  // xử lý checkbox
  const handleCheckBox = (id, e) => {
    const index = roomChecked.findIndex((item) => item.roomTypeId == id);
    if (e.target.checked && index !== -1) {
      setRoomReversed([...roomReversed, roomChecked[index]]);
    }
    if (!e.target.checked && index !== -1) {
      setRoomReversed(roomReversed.filter((item) => item.roomTypeId !== id));
    }
  };

  // xử lý đặt phòng gửi request roomReversed lên server
  const handleRequestReverse = async() => {
    try{
      const res = await holdRooms(roomReversed);
      console.log(roomReversed);
      if(res.code==200){
        const requestQuery = {
          roomReversed:JSON.stringify(roomChecked),
          checkIn: searchRequest.checkIn ? searchRequest.checkIn : "",
          checkOut: searchRequest.checkOut ? searchRequest.checkOut : "",
          email: user.email,
        }
        const query = new URLSearchParams(requestQuery);
        setReversedButtonLoading(true);
        setTimeout(()=>{
          setReversedButtonLoading(false);
          nav(`/booking?${query.toString()}`);
        },3000);
      }
      else{
        openNotification("topRight","Vui lòng kiểm tra lại!","red");
      }
    }catch(error){
      openNotification("topRight","Vui lòng kiểm tra lại","red");
      console.error(error);
    }

  };

  // data cột
  const columns = [
    {
      title: "Loại phòng",
      render: (_, record) => (
        <>
          <div className="roomtype__name">
            <h3>{record.name}</h3>
            <p>
              <span>
                <b>Số lượng giường: </b>
                {record.numBeds} giường
              </span>
              <img src={bed_icon} />
            </p>
            <p>
              <span>
                <b>Diện tích: </b>
                {record.area} m<sup>2</sup>
              </span>
              <img src={area_icon} />
            </p>
          </div>
          <div className="roomtype__facilities">
            <ul>
              {record.freeServices?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      ),
      width: 400,
    },
    {
      title: "Giá hôm nay",
      render: (_, record) => (
        <>
          <div className="roomtype__price">
            <p>
              {new Intl.NumberFormat("vi-VN").format(record.price)} VNĐ/1 ngày
            </p>
            <p>
              {new Intl.NumberFormat("vi-VN").format(
                record.price * (1 - (1.0 * record.discount) / 100)
              )}{" "}
              VNĐ/1 ngày
            </p>
            <Tag style={{ color: "red", fontWeight: "600" }}>
              Giảm giá: {record.discount} %
            </Tag>
          </div>
        </>
      ),
    },
    {
      title: "Số lượng phòng",
      render: (_, record) => (
        <>
          <div className="roomtype__quantity">
            <select
              name={`roomtype-${record.id}`}
              onChange={(e) =>
                handleQuantityRoomChange(record.id, e.target.value)
              }
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
        </>
      ),
    },
    {
      title: "Tổng số tiền thanh toán",
      render: (_, record) => {
        const room = quantityRooms?.find((room) => room.id == record.id);
        const quantity = room ? room.value : 1;
        return (
          <>
            <div className="roomtype__total">
              <p>
                {new Intl.NumberFormat("vi-VN").format(
                  record.price * (1 - (1.0 * record.discount) / 100) * quantity
                )}{" "}
                VNĐ/1 ngày
              </p>
            </div>
          </>
        );
      },
    },
    {
      title: "Trạng thái",
      render: (_, record) => (
        <>
          <div className="roomtype__status">
            {record.status ? (
              <Tag color="blue">Còn</Tag>
            ) : (
              <Tag color="red">Hết</Tag>
            )}
          </div>
        </>
      ),
    },
    {
      title: "Kiểm tra",
      render: (_, record, index) => (
        <>
          <div className="roomtype__action">
            <Button
              type="primary"
              loading={loadingButtons[index]}
              onClick={() => handleCheckRoom(index, record.id)}
            >
              Kiểm tra
            </Button>
          </div>
        </>
      ),
      width: 150,
    },
    {
      title: "Đặt phòng",
      render: (_, record, index) => {
        const existRoomChecked = roomChecked.find(
          (item) => item.roomTypeId == record.id
        );
        if (existRoomChecked) {
          return (
            <>
              <div className="roomtype__action">
                <input
                  type="checkbox"
                  name="reverse"
                  onChange={(e) => handleCheckBox(record.id, e)}
                />
              </div>
            </>
          );
        }
      },
      width: 150,
    },
  ];
  return (
    <>
      {contextHolder}
      <h2>Tìm phòng có sẵn</h2>
      <form className="search" onSubmit={handleSubmit}>
        <div className="search__timeline">
          <RangePicker
            defaultValue={[
              checkIn ? dayjs(checkIn) : null,
              checkOut ? dayjs(checkOut) : null,
            ]}
          />
        </div>
        <div className="search__quantity">
          <input
            type="number"
            placeholder="Số lượng giường"
            name="quantityBeds"
            min={1}
            max={4}
            value={quantityBeds}
          />
        </div>
        <div className="search__button">
          <button type="submit">Tìm kiếm</button>
        </div>
      </form>
      <Button
        type="primary"
        className="reverse-button"
        loading={reversedButtonLoading}
        disabled={!roomReversed.length > 0}
        onClick={handleRequestReverse}
      >
        Đặt phòng
      </Button>
      {loading == false ? (
        <Table
          dataSource={roomTypes}
          columns={columns}
          style={{ marginTop: "100px" }}
          pagination={false}
        />
      ) : (
        <Skeleton active />
      )}
    </>
  );
}
export default RoomAvailability;
