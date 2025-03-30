import "./PropertyItem.scss";
import { Button, Rate } from "antd";
import {HeartOutlined} from "@ant-design/icons";
function PropertyItem(props){
  const {item} = props;
  console.log(item);
  const dataRoomType=[
    {
      room: "Room1",
      price:123
    },
    {
      room:"Room2",
      price:123
    },
    {
      room:"Room3",
      price:123
    }
  ]
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
            <Rate value={item.ratingStar} disabled style={{fontSize:15}}/>
            <h3 className="city-name">{item.cityName}</h3>
            {dataRoomType.map((item,index)=>(
              <h3>{item.room} - {new Intl.NumberFormat('vi-VN').format(item.price)} VNĐ</h3>
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
        <a href="">
          <Button type="primary">
            Xem ngay 
          </Button>
        </a>
      </div>
    </>
  )
}

export default PropertyItem;