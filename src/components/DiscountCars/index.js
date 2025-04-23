import { useEffect, useState } from "react";
import { getAllDiscountCars, getDiscountCarsByUser } from "../../service/RoomService/DiscountCarsService";
import DiscountCarsItem from "./DiscountCarsItem";
import { Button, Col, Row } from "antd";
import "./DiscountCars.scss";
import { getDiscountsByUser } from "../../service/RoomService/DiscountService";
import { useSelector } from "react-redux";
function DiscountCars() {
  const [data, setData] = useState([]);
  const [show, setShowAll] = useState(false);
  const [myDiscounts,setMyDiscounts] = useState();
  const user = useSelector(state=>state.user);
  // get all discount cars
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getAllDiscountCars();
        console.log(res);
        if (res.code == 200) {
          setData(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  // get all my discount cars
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getDiscountCarsByUser(user.email);
        console.log(res);
        if (res.code == 200) {
          setMyDiscounts(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <div>
        <h2>Giảm giá dịch vụ đưa đón</h2>
        <Row gutter={[24, 24]} style={{ marginBottom: "10px" }}>
          {show
            ? data?.map((item, index) => (
                <Col span={8} key={index}>
                  <DiscountCarsItem item={item} myDiscounts={myDiscounts} />
                </Col>
              ))
            : data?.slice(0, 5).map((item, index) => (
                <Col span={8} key={index}>
                  <DiscountCarsItem item={item} myDiscounts={myDiscounts}/>
                </Col>
              ))}
        </Row>
        {data.length > 0 && (
          <Button
            type="primary"
            onClick={() => setShowAll(!show)}
            className="discount__btn"
          >
            {show ? "Ẩn bớt" : "Xem thêm"}
          </Button>
        )}
      </div>
    </>
  );
}
export default DiscountCars;
