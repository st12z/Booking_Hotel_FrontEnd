import { useState } from "react";
import "./RoomAvailability.scss"
import { Button, DatePicker, Table, Tag } from 'antd';
import "./RoomAvailability.scss";
import bed_icon from "../../images/bed-icon.jpg";
import area_icon from "../../images/area-icon.jpg";
const { RangePicker } = DatePicker;

function RoomAvailability(props){
  const {item}=props;
  const [checkIn,setCheckIn]=useState();
  const [checkOut,setCheckOut]=useState();
  const [quantityBeds,setQuantityBeds]=useState();
  const [quantityRooms,setQuantityRooms]=useState([{
    id:0,
    value:0
  }]);
  const handleSubmit=(id)=>{
    let room =quantityRooms?.find(room=>room.id==id);
    if(!room){
      room={
        id:id,
        value:1
      }
    }
    console.log(room);
  }
  const handleQuantityRoomChange = (id, value) => {
    setQuantityRooms((prevQuantityRooms) =>
      prevQuantityRooms.map((room) =>
        room.id === id ? { ...room, value: value } :  {
          id:id,
          value:value
        }
      )
    );
  };

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
            <p>{new Intl.NumberFormat('vi-VN').format(record.price)} VNĐ</p>
            <p>{new Intl.NumberFormat('vi-VN').format(record.price*(1-1.0*record.discount/100))} VNĐ</p>
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
              <p>{new Intl.NumberFormat('vi-VN').format(record.price*(1-1.0*record.discount/100)*quantity)} VNĐ</p>
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
            <Button type="primary"onClick={()=>handleSubmit(record.id)} >Đặt phòng</Button>
          </div>
        </>
      )
    },
    
  ];
  return(
    <>
      <h2>Tìm phòng có sẵn</h2>
      <form className="search" onSubmit={handleSubmit}>
        <div className="search__timeline">
            <RangePicker showTime defaultValue={[checkIn,checkOut]}/>
        </div>
        <div className="search__quantity">
          <input type="number" placeholder="Số lượng giường" name="quantityBeds" max={4} value={quantityBeds} />
        </div>
        <div className="search__button">
          <button type="submit">Tìm kiếm</button>
        </div>
      </form>
      <Table dataSource={item} columns={columns} style={{marginTop:"100px"}} pagination={false}/>;
    </>
  )
}
export default RoomAvailability;