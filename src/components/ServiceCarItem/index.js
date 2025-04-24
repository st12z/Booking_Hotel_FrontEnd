import { Badge, notification, Spin, Rate, Radio } from "antd";
import { getFormatPrice } from "../../utils/format";
import "./ServiceCarItem.scss";
import { useContext, useState } from "react";
import TickIcon from "../../images/tick-icon.jpg";
import {
  cancelVehicle,
  holdVehicle,
} from "../../service/BookingService/VehicleService";
import { useSelector } from "react-redux";
import { PriceContext } from "../../pages/Booking";

function ServiceCarItem(props) {
  const { item } = props;
  const priceNew = item.price * (1 - item.discount / 100);
  const [choosed, setChoosed] = useState([]);
  const [spin, setSpin] = useState(false);
  const user = useSelector((state) => state.user);
  const {setPriceCar} = useContext(PriceContext);
  // Thông báo
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message, color) => {
    api.info({
      message: `Thông báo`,
      description: (
        <span style={{ color: color, fontSize: "20px", fontWeight: 600 }}>
          {message}
        </span>
      ),
      placement,
    });
  };
  // api hold vehicle
  const fetchApi = async (type, id) => {
    const data = {
      email: user.email,
      vehicleId: id,
    };
    if (type == "hold") {
      try {
        const res = await holdVehicle(data);
        console.log(res);
        if (res.code == 200) {
          setPriceCar(priceNew);
          openNotification(
            "topRight",
            "Đặt chỗ thành công trong 10 phút!",
            "green"
          );
        } else {
          openNotification("topRight", "Đặt xe thất bại!", "red");
        }
      } catch (error) {
        openNotification("topRight", "Đặt xe thất bại!", "red");
        console.error(error);
      }
    } else {
      try {
        const res = await cancelVehicle(data);
        if (res.code == 200) {
          setPriceCar(0);
          openNotification("topRight", "Hủy xe thành công!", "green");
        } else {
          openNotification("topRight", "Hủy xe thất bại!", "red");
        }
      } catch (error) {
        openNotification("topRight", "Hủy xe thất bại!", "red");
        console.error(error);
      }
    }
  };
  // Chọn xe
  const handleChooseCar = (id) => {
    setSpin(true);
    setTimeout(() => {
      const index = choosed.findIndex((i) => i == id);
      if (index != -1) {
        fetchApi("cancel", id);
        setChoosed(choosed.filter((i) => i != id));
        setSpin(false);
        return;
      }
      fetchApi("hold", id);
      setChoosed([...choosed, id]);
      setSpin(false);
    }, 2000);
  };
  return (
    <>
      {contextHolder}
      
      <Spin tip="Loading" size="small" spinning={spin}>
        <Badge.Ribbon text={`${item.discount}%`} color="red">
          <div
            className={
              choosed.includes(item.id)
                ? `car__item car__item--choosed`
                : `car__item`
            }
            onClick={() => handleChooseCar(item.id)}
          >
            <div className="car__item__img">
              {choosed.includes(item.id) && (
                <img src={TickIcon} className="tick-icon" />
              )}
              <img src={item.images} alt="" className="item-image" />
            </div>
            <div className="car__item__content">
              <p>
                <b>{item.carType}</b>
              </p>
              <p className="price-old">{getFormatPrice(item.price)}</p>
              <p className="price-new">{getFormatPrice(priceNew)}</p>
              <p>
                <Rate value={item.star} disabled style={{ fontSize: 15 }} />
              </p>
            </div>
          </div>
        </Badge.Ribbon>
      </Spin>
    </>
  );
}
export default ServiceCarItem;
