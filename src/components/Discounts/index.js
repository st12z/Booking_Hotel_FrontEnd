import { Button, Col, Row } from "antd";
import DiscountItem from "./DiscountItem";
import "./Discount.scss";
import { useEffect, useState } from "react";
import {
  getAllDiscounts,
  getDiscountHotelsByUser,
  getDiscountsByUser,
} from "../../service/RoomService/DiscountService";
import { useSelector } from "react-redux";
function Discounts() {
  const [show, setShowAll] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);
  const [myDiscounts, setMyDiscounts] = useState();
  // Lấy tất cả phiếu giảm giá
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getAllDiscounts();

        if (res.code == 200) {
          setData(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  // Lấy phiếu giảm giá của người dùng
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getDiscountHotelsByUser();
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
    <div>
      <h2>Giảm giá khách sạn</h2>
      <Row gutter={[24, 24]} style={{ marginBottom: "10px" }}>
        {show
          ? data?.map((item, index) => (
              <Col span={8} key={index}>
                <DiscountItem item={item} />
              </Col>
            ))
          : data?.slice(0, 5).map((item, index) => (
              <Col span={8} key={index}>
                <DiscountItem item={item} myDiscounts={myDiscounts} />
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
  );
}
export default Discounts;
