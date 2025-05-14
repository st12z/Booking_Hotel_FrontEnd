import { Col, Row } from "antd";
import RatingStaff from "../Rating/RatingStaff.js";
import RatingFacilities from "../Rating/RatingFacilities.js";
import RatingClean from "../Rating/RatingClean.js";
import RatingComfort from "../Rating/RatingComfort.js";
import RatingWifi from "../Rating/RatingWifi.js";
import RatingLocation from "../Rating/RatingLocation.js";
import "./CustomerReviews.scss";
import ListReviews from "../ListReviews/index.js";
import { useEffect, useState } from "react";
import { getReviewsByPropertyId } from "../../service/RoomService/ReviewService.js";
function CustomerReviews({property}) {
  const [reviews,setReviews]=useState([]);
  const [deleteReview,setDeleteReview] = useState();
  useEffect(()=>{
    const fetchApi = async()=>{
      try{
        const res= await getReviewsByPropertyId(property.id);
        console.log(res);
        if(res.code==200){
          setReviews(res.data);
        }
      }catch(error){
        console.error(error);
      }
    }
    fetchApi();
  },[deleteReview]);
  return (
    <>
      <h2>Đánh giá của khách hàng</h2>
      <div className="statistic_reivews">
        <div className="score">
          <p>{property.avgReviewScore.toFixed(2)}</p>
          <p>{reviews.length} reviews</p>
        </div>
        <div className="rating">
          <Row gutter={[10, 10]}>
            <Col span={8}>
              <RatingStaff value={property.ratingStaff} />
            </Col>
            <Col span={8}>
              <RatingFacilities value={property.ratingFacilities} />
            </Col>
            <Col span={8}>
              <RatingClean value={property.ratingClean} />
            </Col>
            <Col span={8}>
              <RatingComfort value={property.ratingComfort} />
            </Col>
            <Col span={8}>
              <RatingWifi value={property.ratingWifi} />
            </Col>
            <Col span={8}>
              <RatingLocation value={property.ratingLocation} />
            </Col>
          </Row>
        </div>
      </div>
      <ListReviews reviews={reviews} onDeleteReview={setDeleteReview}/>
    </>
  );
}
export default CustomerReviews;
