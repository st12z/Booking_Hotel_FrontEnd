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
  let { property, roomType, bookingRequest, myDiscounts } = props;
  if (!property || !roomType || !bookingRequest) {
    return (
      <>
        <Skeleton active />
      </>
    );
  }
  roomType = {
    ...roomType,
    price_new: roomType.price * (1 - (1.0 * roomType.discount) / 100),
  };
  let totalDay = getTotalDay(bookingRequest.checkIn, bookingRequest.checkOut);
  // tổng tiền ban đầu
  const totalPriceOld = roomType.price * bookingRequest.quantity * totalDay;
  // tổng tiền khuyến mãi + giảm giá
  const totalPriceNew =
    roomType.price_new * bookingRequest.quantity * totalDay - priceDiscount;
  // giá khuyến mãi
  const pricePromotion = roomType.price*roomType.discount/100;
  // button use discount
  const handleUseDiscount = (id) => {
    const discount = myDiscounts.find((item) => item.id == id);
    const minBookingAmount = discount.minBookingAmount;

    if (minBookingAmount > totalPriceNew) {
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
        : roomType.price * (1 - (1.0 * discount.discountValue) / 100);
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
      {roomType && (
        <Badge.Ribbon text={`${roomType.discount}%`} color="red">
          <div className="booking-roomtype">
            <div className="booking-roomtype__header">
              <p>{roomType.name}</p>
            </div>
            <div className="booking-roomtype__body">
              <p className="price_old">
                {new Intl.NumberFormat("vi-VN").format(roomType.price)} VNĐ
              </p>
              <p className="price_new">
                {new Intl.NumberFormat("vi-VN").format(roomType.price_new)} VNĐ
              </p>
              <p className="num_beds">
                <img src={BedIcon} />
                <span>{roomType.numBeds} giường</span>
              </p>
            </div>
            <div className="booking-roomtype__footer">
              <ul>
                {roomType.freeServices.slice(0, 5).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Badge.Ribbon>
      )}
      {bookingRequest && (
        <>
          <div className="booking-yourdetails">
            <div className="booking-yourdetails__header">
              <p>Thông tin phòng</p>
            </div>
            <div className="booking-yourdetails__body">
              <div className="time-detail">
                <div className="check-in">
                  <p className="check-type">Check-in</p>
                  <p className="date">{getDate(bookingRequest.checkIn)}</p>
                  <p className="time">{getTime(bookingRequest.checkIn)}</p>
                </div>
                <div className="check-out">
                  <p className="check-type">Check-out</p>
                  <p className="date">{getDate(bookingRequest.checkOut)}</p>
                  <p className="time">{getTime(bookingRequest.checkOut)}</p>
                </div>
              </div>
              <div className="time-stay">
                <p>Tổng số ngày ở: </p>
                <p>{totalDay} buổi</p>
              </div>
              <div className="total-rooms">
                <p>Tổng số phòng đặt: </p>
                <p>{bookingRequest.quantity}</p>
              </div>
            </div>
          </div>
          <div className="booking-price">
            <div className="booking-price__header">
              <p>Hóa đơn</p>
            </div>
            <div className="booking-price__body">
              <p className="price_origin">
                <b>Giá gốc: </b>
                {getFormatPrice(roomType.price)} VNĐ
              </p>
              <p className="price_discount">
                <b>Khuyến mại: </b>
                - {getFormatPrice(pricePromotion)}
              </p>
              <p className="price_discount">
                <b>Phiếu giảm giá: </b>- {getFormatPrice(priceDiscount)}
              </p>
              <p className="price_discount">
                <b>Tổng số ngày ở: </b>
                {totalDay} ngày
              </p>
              <div className="price_total">
                <p className="price__total-discount">
                  {getFormatPrice(totalPriceOld)}
                </p>
                <p>
                  <b>Tổng tiền: </b>
                  {getFormatPrice(totalPriceNew)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
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
