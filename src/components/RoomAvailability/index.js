import { useEffect, useState } from "react";
import "./RoomAvailability.scss"
import { Button, DatePicker, notification, Skeleton, Table, Tag } from 'antd';
import "./RoomAvailability.scss";
import bed_icon from "../../images/bed-icon.jpg";
import area_icon from "../../images/area-icon.jpg";
import { formatLocalDateTime } from "../../utils/format";
import { checkEnoughQuantityRooms, getRoomTypesBySearchRequest } from "../../service/RoomService/RoomTypeService";
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import { useSelector } from "react-redux";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

function RoomAvailability(props){
  const nav = useNavigate();
  const params =useParams();
  const [roomTypes,setRoomTypes] = useState(props.roomTypes);
  const [checkIn,setCheckIn]=useState();
  const [checkOut,setCheckOut]=useState();
  const [quantityBeds,setQuantityBeds]=useState();
  const [searchRequest,setSearchRequest]=useState({});
  const [loading,setLoading] = useState(false);
  const user = useSelector(state=>state.user);

  // Thông tin đã kiểm tra phòng với yêu cầu
  const [checkRequest,setCheckRequest]=useState();
  const [quantityRooms,setQuantityRooms]=useState([{
    roomTypeId:0,
    quantity:0
  }]);

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

  

  // Xử lý việc đặt phòng
  const handleReserve=async (id)=>{
    if(!user.email){
      openNotification("topRight","Vui lòng đăng nhập để đặt phòng!","red");
      return;
    }
    if (!searchRequest || !searchRequest.checkIn || !searchRequest.checkOut) {
      openNotification("topRight", "Vui lòng chọn thời gian check-in, check-out!","red");
      return;
    }
    let room =quantityRooms?.find(room=>room.roomTypeId==id);
    if(!room){
      room={
        roomTypeId:id,
        quantity:1
      }
    }
    

    let checkRequest={
      ...room,
      checkIn:searchRequest.checkIn ? searchRequest.checkIn:"" ,
      checkOut:searchRequest.checkOut ?searchRequest.checkOut:"",
      email:user.email
    }
    console.log(checkRequest);
    setCheckRequest(checkRequest);
    try{
      const res = await checkEnoughQuantityRooms("check-room",checkRequest);
      if(res.code==200){
        const data=res.data;
        if(data<checkRequest.quantity){
          openNotification("topRight",`Không đủ số phòng. Số phòng còn lại ${data}!`,"red");
        }
        else{
          openNotification("topRight",`Bạn có thể đặt phòng!`,"green");
          const checkRequestQuery= new URLSearchParams(checkRequest);
          nav(`/booking?${checkRequestQuery.toString()}`)
        }
      }
    }catch(error){
      console.error(error);
    }
  }
  

  // xử lý select chọn số phòng
  const handleQuantityRoomChange = (id, value) => {
    setQuantityRooms((prevQuantityRooms) =>
      prevQuantityRooms.map((room) =>
        room.roomTypeId === id ? { ...room, quantity: value } :  {
          roomTypeId:id,
          quantity:value
        }
      )
    );
  };

  // xử lý form tìm kiếm
  const handleSubmit=(e)=>{
    setLoading(true);
    e.preventDefault();
    const searchRequest={
      checkIn: formatLocalDateTime(e.target[0].value || ""),
      checkOut: formatLocalDateTime(e.target[1].value || ""),
      quantityBeds: e.target[2].value
    }
    setSearchRequest(searchRequest);
    
  }

  // Gọi api tìm kiếm phòng theo điều kiện searchRequest
  useEffect(()=>{
    const fetchApi=async()=>{
      try{
        const res = await getRoomTypesBySearchRequest(`slugProperty=${params.slug}`,searchRequest);
      if(res.code==200){
        setRoomTypes(res.data);
      }
      }catch(error){
        console.error(error);
      }finally{
        setLoading(false);
      }
    }
    if(searchRequest){
      setTimeout(()=>{
        fetchApi();
      },1000);
    }
  },[searchRequest]);
  // data cột
  const columns = [
    {
      title: 'Loại phòng',
      render: (_,record)=>(
        <>
          <div className="roomtype__name" >
            <h3 >{record.name}</h3>
            <p 
            >
              <span><b>Số lượng giường: </b>{record.numBeds} giường</span>
              <img src={bed_icon}/>
            </p>
            <p>
              <span><b>Diện tích: </b>{record.area} m<sup>2</sup></span>
              <img src={area_icon}/>
            </p>
          </div>
          <div className="roomtype__facilities">
            <ul >
              {record.freeServices?.map((item,index)=>(
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      ),
      width:400,
    },
    {
      title: 'Giá hôm nay',
      render: (_,record)=>(
        <>
          <div className="roomtype__price" >
            <p>{new Intl.NumberFormat('vi-VN').format(record.price)} VNĐ/1 ngày</p>
            <p>{new Intl.NumberFormat('vi-VN').format(record.price*(1-1.0*record.discount/100))} VNĐ/1 ngày</p>
            <Tag style={{color:"red",fontWeight:"600"}}>Giảm giá: {record.discount} %</Tag>
          </div>
        </>
      )
    },
    {
      title: 'Số lượng phòng',
      render: (_,record)=>(
        <>
          <div className="roomtype__quantity" >
            <select 
              name={`roomtype-${record.id}`} 
              onChange={(e)=>handleQuantityRoomChange(record.id,e.target.value)}
            >

              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
        </>
      )
    },
    {
      title: 'Tổng số tiền thanh toán',
      render: (_,record)=>{
        const room=quantityRooms?.find(room=>room.id==record.id) ;
        const quantity=room ? room.value:1;
        return(
          <>
            <div className="roomtype__total" >
              <p>{new Intl.NumberFormat('vi-VN').format(record.price*(1-1.0*record.discount/100)*quantity)} VNĐ/1 ngày</p>
            </div>
          </>
        )
      }
    },
    {
      title: 'Trạng thái',
      render: (_,record)=>(
        <>
          <div className="roomtype__status" >
            {record.status ? <Tag color="blue" >Còn</Tag>: <Tag color="red">Hết</Tag>}
          </div>
        </>
      )
    },
    {
      title: 'Hành động',
      render: (_,record)=>(
        <>
          <div className="roomtype__action" >
          <Button type="primary" onClick={()=>handleReserve(record.id)} >Đặt phòng</Button>
          </div>
        </>
      ),
      width:150
    },
    
  ];
  return(
    <>
      {contextHolder}
      <h2>Tìm phòng có sẵn</h2>
      <form className="search" onSubmit={handleSubmit}>
        <div className="search__timeline">
            <RangePicker  defaultValue={[
              checkIn ?dayjs(checkIn):null,
              checkOut?dayjs(checkOut):null
            ]}/>
        </div>
        <div className="search__quantity">
          <input type="number" placeholder="Số lượng giường" name="quantityBeds" min={1} max={4} value={quantityBeds} />
        </div>
        <div className="search__button">
          <button type="submit">Tìm kiếm</button>
        </div>
      </form>
      {loading==false ? (
        <Table dataSource={roomTypes} columns={columns} style={{marginTop:"100px"}} pagination={false}/>
      ):(
        <Skeleton active/>
      )}
    </>
  )
}
export default RoomAvailability;