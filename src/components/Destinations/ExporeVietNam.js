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
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(500);
  const prependNumber = useRef(1);
  const [products,setProducts]=useState([]);
  const [slides, setSlides] = useState(
    Array.from({ length: 1 }).map((_, index) => `Slide ${index + 1}`)
  );
  useEffect(()=>{
    setSlides(Array.from({ length: data.length }).map((_, index) => `Slide ${index + 1}`))
  },[])

  return(
    <>
      <h1>Khám phá Việt Nam</h1>
      <Swiper 
          modules={[Virtual, Navigation, Pagination,Autoplay]}
          onSwiper={setSwiperRef}
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