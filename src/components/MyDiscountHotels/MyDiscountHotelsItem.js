import { Badge } from "antd";

function MyDiscountHotelsItem({item}) {
  return (
    <>
      <Badge.Ribbon
        text={`${
          item.discountType === "PERCENT"
            ? `${item.discountValue} %`
            : `${new Intl.NumberFormat("vi-VN").format(item.discountValue)} VNĐ`
        }`}
        color="red"
        className="discount__item__badge"
      >
        <div className="discount__item">
          <div className="discount__item__img">
            <img src={item.image} alt="" />
          </div>
          <div className="discount__item__content">
            <h3>{item.code}</h3>

            <p>
              <b>Giá tối thiểu:</b>{" "}
              {new Intl.NumberFormat("vi-VN").format(item.minBookingAmount)} VNĐ
            </p>
            <p>
              <b>Thời gian áp dụng:</b>{" "}
              {new Date(item.startDate).toLocaleDateString()} -{" "}
              {new Date(item.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Badge.Ribbon>
    </>
  );
}
export default MyDiscountHotelsItem;
