import { Badge, Button, Card, notification, Tooltip } from "antd";
import { useSelector } from "react-redux";
import "./DiscountCars.scss";
import { saveDiscountCar } from "../../service/RoomService/DiscountCarsService";
import { useEffect, useState } from "react";

function DiscountCarsItem(props) {
  const [api, contextHolder] = notification.useNotification();
  const user = useSelector((state) => state.user);
  const { item, myDiscounts } = props;
  const [saved, setSaved] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  useEffect(() => {
    if (myDiscounts) {
      const discount = myDiscounts.find((discount) => discount.id == item.id);
      if (discount) setSaved(true);
    }
  }, []);
  const openNotification = (placement, message, color, onClose) => {
    api.info({
      message: `Thông báo`,
      description: (
        <span style={{ color: color, fontSize: "20px", fontWeight: 600 }}>
          {message}
        </span>
      ),
      placement,
      duration: 5,
    });
  };

  // lưu phiếu giảm giá
  const handleSave = (id) => {
    console.log(user);
    if (!user.id) {
      openNotification(
        "topRight",
        "Vui lòng đăng nhập để lưu phiếu giảm giá!",
        "red"
      );
      return;
    }
    const fetchApi = async () => {
      const data = {
        email: user.email,
        discountCarId: id,
      };
      const res = await saveDiscountCar(data);
      console.log(res);
      if (res.code == 200) {
        openNotification("topRight", "Lưu phiếu giảm giá thành công!", "green");
      } else if (res.code == 404) {
        openNotification(
          "topRight",
          "Phiếu giảm giá này đã được lưu.Vui lòng kiểm tra trong mục phiếu giảm giá!",
          "red"
        );
      } else {
        openNotification("topRight", "Phiếu giảm giá đã hết số lượng!", "red");
      }
    };
    setLoadingButton(true);
    setTimeout(() => {
      fetchApi();
      setSaved(true);
      setLoadingButton(false);
    }, 1000);
  };

  return (
    <>
      {contextHolder}
      <Badge.Ribbon
        text={`${item.discountValue}%`}
        color="red"
        className="discount__item__badge"
      >
        <div className="discount__item">
          <div className="discount__item__img">
            <img src={item.images} alt="" />
          </div>
          <div className="discount__item__content">
            <h3>{item.code}</h3>
            <p>
              <b>Thời gian áp dụng:</b>{" "}
              {new Date(item.startDate).toLocaleDateString()} -{" "}
              {new Date(item.endDate).toLocaleDateString()}
            </p>
          </div>
          <div className="discount__item__save">
            {saved ? (
              <Tooltip title="Đã có">
                <Button
                  type="primary"
                  onClick={() => handleSave(item.id)}
                  disabled={saved}
                  loading={loadingButton}
                >
                  Lưu
                </Button>
              </Tooltip>
            ) : (
              <Button
                type="primary"
                onClick={() => handleSave(item.id)}
                disabled={saved}
                loading={loadingButton}
              >
                Lưu
              </Button>
            )}
          </div>
        </div>
      </Badge.Ribbon>
    </>
  );
}
export default DiscountCarsItem;
