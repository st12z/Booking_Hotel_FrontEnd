import "./PropertyItem.scss";
import { Button, Rate } from "antd";
import {HeartOutlined,HeartFilled} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function PropertyItem(props){
  const [tym,setTym]=useState(false);
  const propertiesFavor= localStorage.getItem("properties_favor") ? JSON.parse(localStorage.getItem("properties_favor")) : [];
  useEffect(()=>{
    
    const index = propertiesFavor.findIndex(slug=>slug==item.slug);
    if(index!==-1) setTym(true);
  },[tym]);
  const {item} = props;
  const handleAddPropertiesLocal=(slug)=>{
    let properties = localStorage.getItem("properties") ? JSON.parse(localStorage.getItem("properties")) : [];
    if(properties.length== 0){
      properties.push(slug);
    }
    else{
      const index = properties.indexOf(slug);
      if(index == -1){
        properties.push(slug);
      }
    }
    localStorage.setItem("properties", JSON.stringify(properties));
  }
  const handleTym=()=>{
    setTym(!tym);
    let newPropertiesFavor=[];
    if(tym){
      newPropertiesFavor= propertiesFavor.filter(slug=>slug!=item.slug);
    }
    else{
      newPropertiesFavor.push(item.slug);
    }
    localStorage.setItem("properties_favor",JSON.stringify(newPropertiesFavor));
  }
  return(
    <>
      <div className="property__item">
        <div className="property__item__image">
          <img src={item.images.length>0 ? item.images[0]:""} alt="" />
          {tym ? <HeartFilled className="icon icon--active" onClick={handleTym}/>:<HeartOutlined className="icon" onClick={handleTym}/>}
          
          
        </div>
        <div className="property__item__content">
          <div className="property__item__content__title">
            <h3>{item.name} </h3>
            <h4>Cách trung tâm thành phố: {item.distanceFromCenter.toFixed(2)} Km</h4>
            {item.distanceFromTrip && <h4>Cách biển: {(item.distanceFromTrip/1000).toFixed(2)} Km</h4>}
            <Rate value={item.ratingStar} disabled style={{fontSize:15}}/>
            <h3 className="city-name">{item.cityName}</h3>
            {item.roomTypes?.map((roomType,index)=>(
              <h4 key={index}>{roomType.name} - {new Intl.NumberFormat('vi-VN').format(roomType.price)} VNĐ</h4>
            ))}
          </div>
          <div className="property__item__content__review">
            <div className="property__item__content__review__com1">
              <h3>{item.avgReviewScore >=8 ? "Very Good" : "Good"}</h3>
              <p>{item.numReviews} reviews</p>
            </div>
            <div className="property__item__content__review__com2">
              <span>{item.avgReviewScore.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <Link to={`/properties/${item.slug}`} onClick={()=>handleAddPropertiesLocal(item.slug)}>
          <Button type="primary">
            Xem ngay 
          </Button>
        </Link>
      </div>
    </>
  )
}

export default PropertyItem;