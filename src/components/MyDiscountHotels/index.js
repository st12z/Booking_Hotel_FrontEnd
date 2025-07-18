import { useEffect, useState } from "react";
import { getDiscountHotelsByUserPage } from "../../service/RoomService/DiscountService";
import { Col, Pagination, Row } from "antd";
import MyDiscountHotelsItem from "./MyDiscountHotelsItem";

function MyDiscountHotels() {
  const [data, setData] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState();
  const fetchApi = async () => {
    try {
      const res = await getDiscountHotelsByUserPage(pageNo, pageSize);
      console.log(res);
      if (res.code == 200) {
        setData(res.data.dataPage);
        setTotal(res.data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, [pageNo]);
  return (
    <>
      <h2>Giảm giá khách sạn</h2>
      <Row gutter={[24, 24]} style={{ marginBottom: "10px" }}>
        {data &&
          data.map((item, index) => (
            <Col span={12} key={index}>
              <MyDiscountHotelsItem item={item} />
            </Col>
          ))}
      </Row>
      <Pagination align="end" current={pageNo} total={total} pageSize={pageSize} onChange={(pageNo)=>setPageNo(pageNo)} />
    </>
  );
}
export default MyDiscountHotels;
