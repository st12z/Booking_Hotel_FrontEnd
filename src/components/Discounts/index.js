import { Button, Col, Row } from "antd";
import DiscountItem from "./DiscountItem";
import "./Discount.scss";
import { useState } from "react";
function Discounts() {
    const [show,setShowAll] = useState(false);
  const data= [
        {
            "id": 1,
            "code": "DISCOUNT10",
            "discountType": "PERCENT",
            "discountValue": 10,
            "minBookingAmount": 500000,
            "startDate": "2025-04-01T00:00:00",
            "endDate": "2025-04-30T23:59:59",
            "quantity": 5,
            "image": "https://marketplace.canva.com/EAGGejRWDp8/1/0/1131w/canva-red-and-cream-geometric-hotel-promotion-with-facilities-flyer-UGMYMCwL1ic.jpg"
        },
        {
            "id": 2,
            "code": "DISCOUNT20",
            "discountType": "PERCENT",
            "discountValue": 20,
            "minBookingAmount": 700000,
            "startDate": "2025-04-01T00:00:00",
            "endDate": "2025-04-30T23:59:59",
            "quantity": 6,
            "image": "https://i.pinimg.com/736x/44/7f/d4/447fd44e5a24ca4776de5f3782dc2e6e.jpg"
        },
        {
            "id": 3,
            "code": "FIXED50K",
            "discountType": "FIXED",
            "discountValue": 50000,
            "minBookingAmount": 400000,
            "startDate": "2025-04-01T00:00:00",
            "endDate": "2025-04-15T23:59:59",
            "quantity": 7,
            "image": "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/hotel-airbnb-instagram-social-media-design-template-97a6e7529cee6913fa1dd744d39d6e95.jpg?ts=1698303516"
        },
        {
            "id": 4,
            "code": "FIXED100K",
            "discountType": "FIXED",
            "discountValue": 100000,
            "minBookingAmount": 800000,
            "startDate": "2025-04-01T00:00:00",
            "endDate": "2025-04-20T23:59:59",
            "quantity": 8,
            "image": "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/hotel-airbnb-instagram-social-media-design-template-97a6e7529cee6913fa1dd744d39d6e95.jpg?ts=1698303516"
        },
        {
            "id": 5,
            "code": "HOLIDAY30",
            "discountType": "PERCENT",
            "discountValue": 30,
            "minBookingAmount": 1000000,
            "startDate": "2025-04-05T00:00:00",
            "endDate": "2025-04-25T23:59:59",
            "quantity": 9,
            "image": "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/hotel-airbnb-instagram-social-media-design-template-97a6e7529cee6913fa1dd744d39d6e95.jpg?ts=1698303516"
        },
        {
            "id": 6,
            "code": "SPRINGSALE",
            "discountType": "PERCENT",
            "discountValue": 15,
            "minBookingAmount": 600000,
            "startDate": "2025-04-10T00:00:00",
            "endDate": "2025-04-28T23:59:59",
            "quantity": 10,
            "image": "https://img.freepik.com/free-psd/hotel-template-design_23-2151647862.jpg"
        },
        {
            "id": 7,
            "code": "SUMMER20",
            "discountType": "PERCENT",
            "discountValue": 20,
            "minBookingAmount": 750000,
            "startDate": "2025-05-01T00:00:00",
            "endDate": "2025-05-31T23:59:59",
            "quantity": 6,
            "image": "https://img.freepik.com/free-psd/hotel-template-design_23-2151647862.jpg"
        },
        {
            "id": 8,
            "code": "NEWUSER50",
            "discountType": "FIXED",
            "discountValue": 50000,
            "minBookingAmount": 0,
            "startDate": "2025-04-01T00:00:00",
            "endDate": "2025-06-30T23:59:59",
            "quantity": 5,
            "image": "https://cdn.grabon.in/gograbon/images/web-images/uploads/1617092437646/hotel-offers.jpg"
        },
        {
            "id": 9,
            "code": "VIP100",
            "discountType": "FIXED",
            "discountValue": 100000,
            "minBookingAmount": 1200000,
            "startDate": "2025-04-01T00:00:00",
            "endDate": "2025-05-15T23:59:59",
            "quantity": 4,
            "image": "https://cdn.grabon.in/gograbon/images/web-images/uploads/1617092437646/hotel-offers.jpg"
        },
        {
            "id": 10,
            "code": "FLASHSALE",
            "discountType": "PERCENT",
            "discountValue": 50,
            "minBookingAmount": 1500000,
            "startDate": "2025-04-15T00:00:00",
            "endDate": "2025-04-15T23:59:59",
            "quantity": 3,
            "image": "https://cdn.grabon.in/gograbon/images/web-images/uploads/1617092437646/hotel-offers.jpg"
        }
    ];
  return (
    <div>
      <h1>Giảm giá</h1>
      <Row gutter={[24,24]} style={{marginBottom:"10px"}}>
        {show ? (
            data?.map((item,index)=>(
                <Col span={8} key={index}>
                    <DiscountItem item={item}/>
                </Col>
            ))       
        ):(
            data?.slice(0,5).map((item,index)=>(
            <Col span={8} key={index}>
                <DiscountItem item={item}/>
            </Col>
            ))
        )
        }
      </Row>
    <Button type="primary" onClick={()=>setShowAll(!show)} className="discount__btn">
        {show ? "Ẩn bớt" : "Xem thêm"}
    </Button>
    </div>
  );
}
export default Discounts;