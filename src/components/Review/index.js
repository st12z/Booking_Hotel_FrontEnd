import { Input, Progress, Form, Slider, Row, Col, Button, message, Rate } from "antd";
import { useState } from "react";
import SliderRatingStaff from "../SliderRatingStaff";
import "./Review.scss";
import SliderRatingFacilities from "../SliderRatingFacilities";
import SliderRatingClean from "../SliderRatingClean";
import SliderRatingWifi from "../SliderRatingWifi";
import SliderRatingComfort from "../SliderRatingComfort";
import SliderRatingLocation from "../SliderRatingLocation";
import { useSelector } from "react-redux";
const { TextArea } = Input;

function Review() {
  const user = useSelector((state) => state.user);
  const [ratingStaff, setRatingStaff] = useState(10);
  const [ratingFacilities, setRatingFacilities] = useState(10);
  const [ratingClean, setRatingClean] = useState(10);
  const [ratingComfort, setRatingComfort] = useState(10);
  const [ratingWifi, setRatingWifi] = useState(10);
  const [ratingLocation, setRatingLocation] = useState(10);
  const [loading,setLoading]=useState();
  const [ratingProperty,setRatingProperty]=useState(0);
  const handleSubmit = (e) => {
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      const data = {
        email: user.email,
        content: e.content,
        ratingClean: ratingClean,
        ratingStaff: ratingStaff,
        ratingFacilities: ratingFacilities,
        ratingComfort: ratingComfort,
        ratingWifi: ratingWifi,
        ratingLocation: ratingLocation,
        ratingProperty:ratingProperty
      };
      console.log(data);
    },2000);
    
    
  };

  return (
    <>
      <div className="review" style={{ width: "80%" }}>
        <h2>Đánh giá của khách hàng</h2>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="content"
            rules={[
              { required: true, message: "Vui lòng gửi nội dung đánh giá!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <div className="review__rating">
            <Row gutter={[12, 12]}>
              <Col span={8}>
                <SliderRatingStaff
                  ratingStaff={ratingStaff}
                  onSetRating={setRatingStaff}
                  title={"Staff"}
                />
              </Col>
              <Col span={8}>
                <SliderRatingFacilities
                  ratingFacilities={ratingFacilities}
                  onSetRating={setRatingFacilities}
                  title={"Facilities"}
                />
              </Col>
              <Col span={8}>
                <SliderRatingClean
                  ratingClean={ratingClean}
                  onSetRating={setRatingClean}
                  title={"Cleanliness"}
                />
              </Col>
              <Col span={8}>
                <SliderRatingComfort
                  ratingComfort={ratingComfort}
                  onSetRating={setRatingComfort}
                  title={"Comfort"}
                />
              </Col>
              <Col span={8}>
                <SliderRatingWifi
                  ratingWifi={ratingWifi}
                  onSetRating={setRatingWifi}
                  title={"Wifi"}
                />
              </Col>
              <Col span={8}>
                <SliderRatingLocation
                  ratingLocation={ratingLocation}
                  onSetRating={setRatingLocation}
                  title={"Location"}
                />
              </Col>
            </Row>
          </div>
          <Form.Item >
            <h3 style={{margin:"0"}}>Property</h3>
            <Rate onChange={setRatingProperty} value={ratingProperty}/>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" loading={loading}>
              Gửi đánh giá
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
export default Review;
