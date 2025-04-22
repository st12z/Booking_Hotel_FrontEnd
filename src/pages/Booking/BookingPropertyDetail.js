import { Badge, Button, notification, Rate, Skeleton } from "antd";
import "./BookingPropertyDetail.scss";
import LocationIcon from "../../images/location-icon.jpg";
import BedIcon from "../../images/bed-icon.jpg";
import {
  getDate,
  getFormatPrice,
  getTime,
  getTotalDay,
} from "../../utils/format";
import { useEffect, useState } from "react";
function BookingPropertyDetail(props) {
  const [api, contextHolder] = notification.useNotification();
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [choosedId, setChoosedId] = useState(false);
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
  const { property, roomReverseds, myDiscounts } = props;
  if (!property || !roomReverseds || !myDiscounts) {
    return (
      <>
        <Skeleton active />
      </>
    );
  }
  const updatedRoomReverseds = roomReverseds.map((item) => {
    const totalDay = getTotalDay(item.checkIn, item.checkOut);
    const priceNew = item.price * (1 - (1.0 * item.discount) / 100);
    const totalPriceOld = item.price * item.quantity * totalDay;
    const totalPriceNew = priceNew * item.quantity * totalDay;
    const pricePromotion = (item.price * item.discount) / 100;

    return {
      ...item,
      priceNew: priceNew,
      totalPriceOld: totalPriceOld,
      totalPriceNew: totalPriceNew,
      pricePromotion: pricePromotion,
      totalDay: totalDay,
    };
  });
  const totalPromotion = updatedRoomReverseds.reduce((sum,item)=>sum+item.pricePromotion,0);
  const totalOrderOld = updatedRoomReverseds.reduce(
    (sum, item) => sum + item.totalPriceOld,
    0
  );
  const totalOrderNew =
    updatedRoomReverseds.reduce((sum, item) => sum + item.totalPriceNew, 0) -
    priceDiscount;
  const handleUseDiscount = (id) => {
    const discount = myDiscounts.find((item) => item.id == id);
    const minBookingAmount = discount.minBookingAmount;
    if (minBookingAmount > totalOrderNew) {
      openNotification(
        "topRight",
        "Phiếu giảm giá chưa đủ điều kiện để áp dụng!",
        "red"
      );
      return;
    }
    const priceDiscountFromCoupon =
      discount.discountType == "FIXED"
        ? discount.discountValue
        : totalOrderNew * ((1.0 * discount.discountValue) / 100);
    setPriceDiscount(priceDiscountFromCoupon);
    setChoosedId(id);
  };
  // button cancel discount
  const handleCancelDiscount = (id) => {
    setPriceDiscount(0);
    setChoosedId(-1);
  };

  return (
    <>
      {contextHolder}
      {property && (
        <div className="booking-property">
          <div className="booking-property__header">
            <p>{property.propertyType}</p>
            <Rate value={property.ratingStar} disabled />
          </div>
          <div className="booking-property__body">
            <p className="name">{property.name}</p>
            <div className="address">
              <img src={LocationIcon} />
              <p>{property.address}</p>
            </div>
          </div>
          <div className="booking-property__reviews">
            <p className="score">{property.avgReviewScore}</p>
            <p className="review">{property.numReviews} reviews</p>
          </div>
          <div className="booking-property__facilities">
            <ul>
              {property.facilities && property.facilities.length > 2 && (
                <li>
                  {property.facilities.slice(0, 3).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
      {updatedRoomReverseds &&
        updatedRoomReverseds.map((item, index) => (
          <Badge.Ribbon text={`${item.discount}%`} color="red" key={index}>
            <div className="booking-roomtype">
              <div className="booking-roomtype__header">
                <p>{item.name}</p>
              </div>
              <div className="booking-roomtype__body">
                <p className="price_old">
                  {new Intl.NumberFormat("vi-VN").format(item.price)} VNĐ
                </p>
                <p className="price_new">
                  {new Intl.NumberFormat("vi-VN").format(item.priceNew)} VNĐ
                </p>
                <p className="num_beds">
                  <img src={BedIcon} />
                  <span>{item.numBeds} giường</span>
                </p>
              </div>
              <div className="booking-roomtype__footer">
                <ul>
                  {item.freeServices.slice(0, 5).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="booking-yourdetails">
                <div className="booking-yourdetails__header">
                  <p>Thông tin phòng</p>
                </div>
                <div className="booking-yourdetails__body">
                  <div className="time-detail">
                    <div className="check-in">
                      <p className="check-type">Check-in</p>
                      <p className="date">{getDate(item.checkIn)}</p>
                      <p className="time">{getTime(item.checkIn)}</p>
                    </div>
                    <div className="check-out">
                      <p className="check-type">Check-out</p>
                      <p className="date">{getDate(item.checkOut)}</p>
                      <p className="time">{getTime(item.checkOut)}</p>
                    </div>
                  </div>
                  <div className="time-stay">
                    <p>Tổng số ngày ở: </p>
                    <p>{item.totalDay} buổi</p>
                  </div>
                  <div className="total-rooms">
                    <p>Tổng số phòng đặt: </p>
                    <p>{item.quantity}</p>
                  </div>
                </div>
              </div>
              <div className="booking-price">
                <div className="booking-price__header">
                  <p>Hóa đơn phòng</p>
                </div>
                <div className="booking-price__body">
                  <p className="price_origin">
                    <b>Giá gốc: </b>
                    {getFormatPrice(item.price)} VNĐ
                  </p>
                  <p className="price_discount">
                    <b>Khuyến mại: </b>- {getFormatPrice(item.pricePromotion)}
                  </p>
                  <p className="price_discount">
                    <b>Tổng số ngày ở: </b>
                    {item.totalDay} ngày
                  </p>
                  <div className="price_total">
                    <p className="price__total-discount">
                      {getFormatPrice(item.totalPriceOld)}
                    </p>
                    <p>
                      <b>Tổng tiền: </b>
                      {getFormatPrice(item.totalPriceNew)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Badge.Ribbon>
        ))}
      <div className="booking-order">
        <div className="booking-order__header">
          <p>Hóa đơn</p>
        </div>
        <div className="booking-order__body">
          <div className="price__total">
            <div className="price__total-old">
              <p>
                <b>Tổng tiền ban đầu: </b>
                <span className="">{getFormatPrice(totalOrderOld)}</span>
              </p>
              <p>
                <b>Khuyến mãi: </b>
                - {getFormatPrice(totalPromotion)}
              </p>
              <p>
                <b>Giảm giá: </b>
                - {getFormatPrice(priceDiscount)}
              </p>
            </div>
            <p>
              <b>Tổng tiền: </b>
              {getFormatPrice(totalOrderNew)}
            </p>
          </div>
        </div>
      </div>
      {myDiscounts && (
        <div className="booking-discounts">
          <div className="booking-discounts__header">
            <p>Mã giảm giá</p>
          </div>
          {myDiscounts.map((item, index) => (
            <>
              <Badge.Ribbon
                text={
                  item.discountType == "PERCENT"
                    ? `${item.discountValue}%`
                    : `${getFormatPrice(item.discountValue)}`
                }
                color="red"
              >
                <div className="booking-discounts__item" key={index}>
                  <div className="booking-discounts__item__image">
                    <img src={item.image} />
                  </div>
                  <div className="booking-discounts__item__content">
                    <p className="discount-code">{item.code}</p>
                    <p>
                      <b>Giá tối thiểu: </b>
                      {getFormatPrice(item.minBookingAmount)}
                    </p>
                    <p>
                      <b>Thời gian áp dụng: </b>
                      {getDate(item.startDate)} - {getDate(item.endDate)}
                    </p>
                  </div>
                  <div className="booking-discounts__item__use">
                    {choosedId != item.id ? (
                      <Button
                        type="primary"
                        onClick={() => handleUseDiscount(item.id)}
                      >
                        Sử dụng
                      </Button>
                    ) : (
                      <Button
                        color="danger"
                        variant="solid"
                        onClick={() => handleCancelDiscount(item.id)}
                      >
                        Hủy bỏ
                      </Button>
                    )}
                  </div>
                </div>
              </Badge.Ribbon>
            </>
          ))}
        </div>
      )}
    </>
  );
}

export default BookingPropertyDetail;
