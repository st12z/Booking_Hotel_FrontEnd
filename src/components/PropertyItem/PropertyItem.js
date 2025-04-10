import "./PropertyItem.scss";
import { Button, Rate } from "antd";
import {HeartOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
function PropertyItem(props){
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
  return(
    <>
      <div className="property__item">
        <div className="property__item__image">
          <img src={item.images.length>0 ? item.images[0]:""} alt="" />
          <HeartOutlined className="icon"/>
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
              <span>{item.avgReviewScore}</span>
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