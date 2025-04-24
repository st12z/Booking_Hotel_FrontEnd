import {
  Col,
  Form,
  Skeleton,
  Radio,
  Row,
  Button,
  Checkbox,
  Slider,
} from "antd";
import { getAllVehicles } from "../../service/BookingService/VehicleService";
import { useEffect, useMemo, useState } from "react";
import ServiceCarItem from "../ServiceCarItem";
function ServiceCar() {
  const [dataCar, setDataCar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [choosedStars, setChoosedStars] = useState([]);
  const [choosedCarTypes, setChoosedCarTypes] = useState([]);
  const [choosedPrice, setChoosedPrice] = useState(0);
  const data = useMemo(() => {
    return {
      choosedStars: choosedStars,
      choosedCarTypes: choosedCarTypes,
      choosedPrice: choosedPrice,
    };
  }, [choosedStars, choosedCarTypes, choosedPrice]);
  // fetch data
  useEffect(() => {
    if(show) setLoading(true);
    setTimeout(() => {
      fetchApiVehicles(data);
      setLoading(false);
    }, 2000);
  }, [data]);
  const style = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };
  // GET ALL VEHICLES
  const fetchApiVehicles = async () => {
    try {
      const res = await getAllVehicles(data);
      if (res.code == 200) {
        setDataCar(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeShuttle = (e) => {
    const value = e.target.value;
    if (value == 1) {
      setLoading(true);
      setShow(true);
      setTimeout(() => {
        setLoading(false);
        if (dataCar.length == 0) fetchApiVehicles();
      }, 2000);
    } else {
      setChoosedCarTypes([]);
      setChoosedStars([]);
      setChoosedPrice(0);
      setShow(false);
    }
  };
  return (
    <div className="info-service">
      <div className="">
        <h2>Bạn có muốn dịch vụ xe đưa đón ?</h2>
        <Form.Item name="isShuttleService">
          <Radio.Group
            onChange={(e) => handleChangeShuttle(e)}
            style={style}
            options={[
              { value: 1, label: "Có." },
              { value: 2, label: "Không." },
            ]}
          />
        </Form.Item>
      </div>
      <div className="">
        {loading ? (
          <Skeleton active />
        ) : (
          <>
            {show && (
              <>
                <h2>Loại xe</h2>
                <Checkbox.Group
                  style={style}
                  value={choosedCarTypes}
                  options={[
                    { value: "TAXI", label: "Xe Taxi" },
                    { value: "SEAT_4", label: "Xe 4 chỗ" },
                    { value: "SEAT_7", label: "Xe 7 chỗ" },
                    { value: "BUS", label: "Xe Bus" },
                    { value: "LIMOUSINE", label: "Xe Limousine" },
                  ]}
                  onChange={(e) => setChoosedCarTypes(e)}
                />
                <h2>Đánh giá</h2>
                <Checkbox.Group
                  value={choosedStars}
                  options={[
                    { value: 1, label: "1 sao" },
                    { value: 2, label: "2 sao" },
                    { value: 3, label: "3 sao" },
                    { value: 4, label: "4 sao" },
                    { value: 5, label: "5 sao" },
                  ]}
                  onChange={(e) => setChoosedStars(e)}
                />
                <h2>Giá</h2>
                <Slider
                  max={2000000}
                  step={50000}
                  value={choosedPrice}
                  tooltip={{
                    open: true,
                    formatter: (value) => `${value.toLocaleString()} VND`,
                  }}
                  style={{ width: "50%", marginTop: "50px" }}
                  onChange={(e) => setChoosedPrice(e)}
                />
              </>
            )}
            {show && dataCar.length == 0 && (
              <h2>Hiện tại đang không còn xe!</h2>
            )}
            {show && dataCar && dataCar.length > 0 && (
              <>
                <div className="info-service__car">
                  <h2>Chọn xe đưa đón</h2>
                  <Row gutter={[16, 16]}>
                    {showMore
                      ? dataCar.map((item, index) => (
                          <Col span={8} key={index}>
                            <ServiceCarItem item={item} />
                          </Col>
                        ))
                      : dataCar.slice(0, 5).map((item, index) => (
                          <Col span={8} key={index}>
                            <ServiceCarItem item={item} />
                          </Col>
                        ))}
                  </Row>
                </div>
                {showMore ? (
                  <Button onClick={() => setShowMore(false)}>Ẩn bớt</Button>
                ) : (
                  <Button onClick={() => setShowMore(true)}>Xem thêm</Button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default ServiceCar;
