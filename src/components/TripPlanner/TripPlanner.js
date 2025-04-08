import { useEffect, useState } from "react";
import beachIcon from "../../images/beach-icon.jpg";
import mountainIcon from "../../images/mountain-icon.jpg";
import outdoorIcon from "../../images/outdoor-icon.jpg";
import "./TripPlanner.scss";
import {Virtual, Navigation, Pagination, Autoplay} from 'swiper/modules';
import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import TripItem from "./TripItem";
import { getAllTripTypes, getTripsByType } from "../../service/RoomService/TripService";
import { NavLink } from "react-router-dom";
function TripPlanner(){
  const [data,setData]=useState([]);
  const [dataTripType,setDataTripType]=useState([]);
  const [tripType,setTripType]=useState("");
  useEffect(()=>{
    const fetchApi= async()=>{
      try{
        const resData = await getTripsByType(tripType);
        console.log(resData);
        const resDataTripType= await getAllTripTypes();
        if(resData.code==200){
          setData(resData.data);
          setDataTripType(resDataTripType.data);
        }
      }catch(error){
        console.error(error);
      }
    };
    fetchApi();
  },[tripType]);
  const handleClick=(tripType)=>{
    console.log(tripType);
    setTripType(tripType.tripType);
  }
  return(
    <>
      <h1>Kế hoạch chuyến đi</h1>
      <div className="trip">
        <ul>
          {dataTripType?.map((item,index)=>(
            <li key={index} onClick={()=>handleClick(item)} className={tripType===item.tripType?"trip--active":""}>
              <div>
                <img src={item.imageIcon} alt="Outdoor" />
                <span>{item.tripType}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Swiper
          modules={[Virtual, Navigation, Pagination,Autoplay]}
          slidesPerView={5}
          centeredSlides={false}
          spaceBetween={10}
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
          virtual
        >
          { data?.map((item, index) => (
              <SwiperSlide key={item.id} virtualIndex={index} >
                <a href={`/search?destination=${item.name}`}>
                  <div className="trip__item">
                    <TripItem item={item}/>
                  </div>
                </a>
              </SwiperSlide>
          ))}
        </Swiper>
    </>
  )
}
export default TripPlanner;