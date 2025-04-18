import { Badge, Rate, Skeleton } from "antd";
import "./BookingPropertyDetail.scss";
import LocationIcon from "../../images/location-icon.jpg";
import BedIcon from "../../images/bed-icon.jpg";
import { getDate, getTime, getTotalDay } from "../../utils/format";
import { useEffect } from "react";
function BookingPropertyDetail(props) {
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
  const totalPriceOld = roomType.price * bookingRequest.quantity;
  const totalPriceNew = roomType.price_new * bookingRequest.quantity;
  const totalPriceDiscount = totalPriceNew - totalPriceOld;
  return (
    <>
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
                    <li>{item}</li>
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
                {roomType.freeServices.slice(0, 5).map((item) => (
                  <li>{item}</li>
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
                {new Intl.NumberFormat("vi-VN").format(totalPriceOld)} VNĐ
              </p>
              <p className="price_discount">
                <b>Khuyến mại: </b>
                {new Intl.NumberFormat("vi-VN").format(totalPriceDiscount)} VNĐ
              </p>
              <div className="price_total">
                <p className="price__total-discount">
                  {new Intl.NumberFormat("vi-VN").format(totalPriceOld)} VNĐ
                </p>
                <p>
                  <b>Tổng tiền: </b>
                  {new Intl.NumberFormat("vi-VN").format(totalPriceNew)} VNĐ
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      {myDiscounts && (
        <>
          <div className="booking-discounts">
            <div className="booking-discounts__header">
              <p>Mã giảm giá</p>
            </div>
            <div className="booking-discounts__body">

            </div>
            <div className="booking-discounts__footer">
              
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default BookingPropertyDetail;
