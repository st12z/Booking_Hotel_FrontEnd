import { Badge } from "antd";

function MyDiscountCarItem({item}) {
  return (
    <>
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
        </div>
      </Badge.Ribbon>
    </>
  );
}
export default MyDiscountCarItem;
