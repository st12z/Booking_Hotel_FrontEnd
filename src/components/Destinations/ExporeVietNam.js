import { Col, Row } from "antd";
import {Virtual, Navigation, Pagination, Autoplay} from 'swiper/modules';
import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./ExploreVietName.scss"
import { useEffect, useRef, useState } from "react";
import DestinationItem from "./DestinationItem";
function ExporeVietNam(props){
  const {data}=props;
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
            <div key={index}>
              <SwiperSlide key={item.id} virtualIndex={index} >
                <a href="/">
                  <div className="explore__item">
                    <DestinationItem item={item}/>
                  </div>
                </a>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
    </>
  )
}
export default ExporeVietNam;