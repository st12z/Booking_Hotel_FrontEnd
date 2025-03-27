import { useState } from "react";
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
function TripPlanner(){
  const dataAll=[
    {
        "id": 1,
        "name": "Lăng chủ tịch",
        "tripType": "Outdoors",
        "city_id": 1,
        "latitude": 21.04,
        "longitude": 105.83,
        "image": "https://lh5.googleusercontent.com/p/AF1QipNk0hiKji1aeJiKGmyWvsQkokDlNbXQyJufTMiV=w408-h307-k-no"
    },
    {
        "id": 2,
        "name": "Hồ Tây",
        "tripType": "Outdoors",
        "city_id": 1,
        "latitude": 21.05,
        "longitude": 105.82,
        "image": "https://lh5.googleusercontent.com/p/AF1QipNMXIxamQP1T5Y8-MWHHivPt109t7KUeS3Fra_c=w408-h271-k-no"
    },
    {
        "id": 3,
        "name": "Hồ Hoàn Kiếm",
        "tripType": "Outdoors",
        "city_id": 1,
        "latitude": 21.03,
        "longitude": 105.85,
        "image": "https://lh5.googleusercontent.com/p/AF1QipN3-_0wrzFsf30vYg5nR6mwLroFyNp-qYsnV6B6=w408-h246-k-no"
    },
    {
        "id": 4,
        "name": "Phố đường tàu",
        "tripType": "Outdoors",
        "city_id": 1,
        "latitude": 21.03,
        "longitude": 105.84,
        "image": "https://lh5.googleusercontent.com/p/AF1QipMML6HcF8W-K9js2Bo2pr5aRVip57Fn7bTlPswY=w408-h510-k-no"
    },
    {
        "id": 7,
        "name": "Cầu rồng",
        "tripType": "Outdoors",
        "city_id": 3,
        "latitude": 16.06,
        "longitude": 108.23,
        "image": "https://lh5.googleusercontent.com/p/AF1QipORTOLHKjRkpcwmf9QE6qs_smZwgf-tPEdkwxlL=w408-h272-k-no"
    },
    {
        "id": 8,
        "name": "Ba Na Hills",
        "tripType": "Outdoors",
        "city_id": 3,
        "latitude": 16.00,
        "longitude": 108.00,
        "image": "https://lh5.googleusercontent.com/p/AF1QipMW717XyWoWQH5nR6KQ1ukbcSczJNGcbU-On08r=w426-h240-k-no"
    },
    {
        "id": 9,
        "name": "Đà Lạt",
        "tripType": "Outdoors",
        "city_id": 4,
        "latitude": 11.89,
        "longitude": 108.49,
        "image": "https://nhuytravel.net/wp-content/uploads/2023/08/samten-hills-da-lat-savingbooking1.jpg"
    },
    {
      "id": 5,
      "name": "Biển Nha Trang",
      "tripType": "Beach",
      "city_id": 5,
      "latitude": 12.24,
      "longitude": 109.20,
      "image": "https://lh3.googleusercontent.com/p/AF1QipNhKiLpbzC-Sa2JyfXz95YKUBdxhHfIeHiYuw3O=w426-h240-k-no"
    },
    { 
      "id": 6,
      "name": "Bãi biển Thụy Khê",
      "tripType": "Beach",
      "city_id": 3,
      "latitude": 16.07,
      "longitude": 108.25,
      "image": "https://lh3.googleusercontent.com/p/AF1QipPgpkvaWeKD9pejm2Org-oEx-SWXLyGH_qSUneu=s294-w294-h220-k-no"
    }
  ];
  const [data,setData]=useState(dataAll);
  const [tripType,setTripType]=useState(0);
  
  const dataOutdoor= [
        {
            "id": 1,
            "name": "Lăng chủ tịch",
            "tripType": "Outdoors",
            "city_id": 1,
            "latitude": 21.04,
            "longitude": 105.83,
            "image": "https://lh5.googleusercontent.com/p/AF1QipNk0hiKji1aeJiKGmyWvsQkokDlNbXQyJufTMiV=w408-h307-k-no"
        },
        {
            "id": 2,
            "name": "Hồ Tây",
            "tripType": "Outdoors",
            "city_id": 1,
            "latitude": 21.05,
            "longitude": 105.82,
            "image": "https://lh5.googleusercontent.com/p/AF1QipNMXIxamQP1T5Y8-MWHHivPt109t7KUeS3Fra_c=w408-h271-k-no"
        },
        {
            "id": 3,
            "name": "Hồ Hoàn Kiếm",
            "tripType": "Outdoors",
            "city_id": 1,
            "latitude": 21.03,
            "longitude": 105.85,
            "image": "https://lh5.googleusercontent.com/p/AF1QipN3-_0wrzFsf30vYg5nR6mwLroFyNp-qYsnV6B6=w408-h246-k-no"
        },
        {
            "id": 4,
            "name": "Phố đường tàu",
            "tripType": "Outdoors",
            "city_id": 1,
            "latitude": 21.03,
            "longitude": 105.84,
            "image": "https://lh5.googleusercontent.com/p/AF1QipMML6HcF8W-K9js2Bo2pr5aRVip57Fn7bTlPswY=w408-h510-k-no"
        },
        {
            "id": 7,
            "name": "Cầu rồng",
            "tripType": "Outdoors",
            "city_id": 3,
            "latitude": 16.06,
            "longitude": 108.23,
            "image": "https://lh5.googleusercontent.com/p/AF1QipORTOLHKjRkpcwmf9QE6qs_smZwgf-tPEdkwxlL=w408-h272-k-no"
        },
        {
            "id": 8,
            "name": "Ba Na Hills",
            "tripType": "Outdoors",
            "city_id": 3,
            "latitude": 16.00,
            "longitude": 108.00,
            "image": "https://lh5.googleusercontent.com/p/AF1QipMW717XyWoWQH5nR6KQ1ukbcSczJNGcbU-On08r=w426-h240-k-no"
        },
        {
            "id": 9,
            "name": "Đà Lạt",
            "tripType": "Outdoors",
            "city_id": 4,
            "latitude": 11.89,
            "longitude": 108.49,
            "image": "https://nhuytravel.net/wp-content/uploads/2023/08/samten-hills-da-lat-savingbooking1.jpg"
        }
  ];
  const dataBeach=[
    {
        "id": 5,
        "name": "Biển Nha Trang",
        "tripType": "Beach",
        "city_id": 5,
        "latitude": 12.24,
        "longitude": 109.20,
        "image": "https://lh3.googleusercontent.com/p/AF1QipNhKiLpbzC-Sa2JyfXz95YKUBdxhHfIeHiYuw3O=w426-h240-k-no"
    },
    {
        "id": 6,
        "name": "Bãi biển Thụy Khê",
        "tripType": "Beach",
        "city_id": 3,
        "latitude": 16.07,
        "longitude": 108.25,
        "image": "https://lh3.googleusercontent.com/p/AF1QipPgpkvaWeKD9pejm2Org-oEx-SWXLyGH_qSUneu=s294-w294-h220-k-no"
    }
  ];
  const dataMountain=[];
  const handleClick=(tripType)=>{
    if(tripType===1){
      setData(dataOutdoor);
    }else if(tripType===2){
      setData(dataBeach);
    }else if(tripType===3){
      setData(dataMountain);
    }
    setTripType(tripType);
  }
  return(
    <>
      <h1>Kế hoạch chuyến đi</h1>
      <div className="trip">
        <ul>
          <li onClick={()=>handleClick(1)} className={tripType===1?"trip--active":""}>
            <div>
              <img src={outdoorIcon} alt="Outdoor" />
              <span>Ngoài trời</span>
            </div>
          </li>
          <li onClick={()=>handleClick(2)} className={tripType===2?"trip--active":""}>
            <div>
              <img src={beachIcon} alt="Beach" />
              <span>Bãi biển</span>
            </div>
          </li>
          <li onClick={()=>handleClick(3)} className={tripType===3?"trip--active":""}>
            <div>
              <img src={mountainIcon} alt="Mountain" />
              <span>Núi</span>
            </div>
          </li>
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
            <div key={index}>
              <SwiperSlide key={item.id} virtualIndex={index} >
                <a href="/">
                  <div className="trip__item">
                    <TripItem item={item}/>
                  </div>
                </a>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
    </>
  )
}
export default TripPlanner;