import { Col, Row } from "antd";
import {Virtual, Navigation, Pagination, Autoplay} from 'swiper/modules';
import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./ExploreVietName.scss"
import { useEffect, useRef, useState } from "react";
import DestinationItem from "./DestinationItem";
import { NavLink } from "react-router-dom";
function ExporeVietNam(props){
  const {data}=props;
  const handleAddPropertiesLocal=(name)=>{
    let destinations = localStorage.getItem("destinations") ? JSON.parse(localStorage.getItem("destinations")) : [];
    if(destinations.length== 0){
      destinations.push(name);
    }
    else{
      const index = destinations.indexOf(name);
      if(index == -1){
        destinations.push(name);
      }
    }
    localStorage.setItem("destinations", JSON.stringify(destinations));
  }
  return(
    <>
      <h1>Khám phá Việt Nam</h1>
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
          {data.map((item, index) => (
              <SwiperSlide key={item.id} virtualIndex={index} >
                <a href={`/search?destination=${item.name}`} onClick={()=>handleAddPropertiesLocal(item.name)}>
                  <div className="explore__item">
                    <DestinationItem item={item}/>
                  </div>
                </a>
              </SwiperSlide>
          ))}
        </Swiper>
    </>
  )
}
export default ExporeVietNam;