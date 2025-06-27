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
import { useContext, useEffect, useMemo, useState } from "react";
import { Context } from ".";
function BookingPropertyDetail(props) {
  const { form } = useContext(Context);
  const { priceCar } = useContext(Context);
  const [api, contextHolder] = notification.useNotification();
  const [priceDiscount, setPriceDiscount] = useState(0);
  // discount hotel được chọn
  const [choosedId, setChoosedId] = useState(-1);
  // discount car được chọn
  const [choosedIdCar, setChoosedIdCar] = useState(-1);
  const [loadingButtons, setLoadingButtons] = useState([]);
  const [loadingButtonsCar, setLoadingButtonsCar] = useState([]);
  
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
  const { property, roomReverseds, myDiscountHotels, myDiscountCars} = props;
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
  // set propertyId vào form
  // set propertyId vào form
  form.setFieldsValue({
    propertyId: props.property?.id,
  });
  // Đặt xe
  const priceDiscountCar = useMemo(() => {
    if (choosedIdCar == -1) {
      return 0;
    }
    const discount = myDiscountCars?.find((item) => item.id == choosedIdCar);
    if (!discount) return 0; // thêm phòng lỗi discount không tồn tại

    return priceCar * (discount.discountValue / 100);
  }, [priceCar, choosedIdCar, myDiscountCars]);
  // Tổng khuyến mãi
  const totalPromotion = updatedRoomReverseds.reduce(
    (sum, item) => sum + item.pricePromotion,
    0
  );
  // Tổng tiền đặt khách sạn
  let totalPaymentHotel = updatedRoomReverseds.reduce(
    (sum, item) => sum + item.totalPriceOld,
    0
  );
  // Tổng tiền ban đầu
  let totalOrderOld = updatedRoomReverseds.reduce(
    (sum, item) => sum + item.totalPriceOld,
    0
  );
  totalOrderOld = totalOrderOld + priceCar;
  // Tổng tiền mới
  const totalOrderNew =
    updatedRoomReverseds.reduce((sum, item) => sum + item.totalPriceNew, 0) +
    priceCar -
    priceDiscount -
    priceDiscountCar;
  // sử dụng discount hotel
  const handleUseDiscount = (index, id) => {
    // set trạng thái loading của nút là true
    setLoadingButtons((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    // thời gian chạy loading là false, đồng thời gọi api check
    setTimeout(async () => {
      setLoadingButtons((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
      const discount = myDiscountHotels.find((item) => item.id == id);
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
    }, 3000);
  };

  // set form
  form.setFieldsValue({
    discountHotel: priceDiscount, // phiếu giảm giá khách sạn
    discountCar: priceDiscountCar, // phiếu giảm giá xe
    pricePromotion: totalPromotion, // tổng tiền khuyến mãi
    originTotalPayment: totalOrderOld, // tổng tiền ban đầu
    newTotalPayment: totalOrderNew, // tổng tiền mới
  });
  let roomTypes = [];
  updatedRoomReverseds?.forEach((item) => {
    roomTypes.push({
      roomTypeId: item.id,
      quantityRooms: item.quantity,
      checkIn: item.checkIn,
      checkOut: item.checkOut,
      dayStays: item.totalDay,
      originPayment: item.totalPriceOld,
      promotion: item.pricePromotion,
      newPayment: item.totalPriceNew,
      propertyId: item.propertyId,
    });
  });
  form.setFieldsValue({
    roomTypes: roomTypes,
  });
  // Nút hủy dùng discount của hotel
  const handleCancelDiscount = (index, id) => {
    // set trạng thái loading của nút là true
    setLoadingButtons((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    // thời gian chạy loading là false, đồng thời gọi api check
    setTimeout(async () => {
      setLoadingButtons((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
      setPriceDiscount(0);
      setChoosedId(-1);
    }, 3000);
  };
  // sử dụng discont car
  const handleUseDiscountCar = (index, id) => {
    // set trạng thái loading của nút là true
    setLoadingButtonsCar((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    // thời gian chạy loading là false, đồng thời gọi api check
    setTimeout(async () => {
      setLoadingButtonsCar((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
      if (priceCar == 0) {
        openNotification("topRight", "Vui lòng đặt xe trước!", "red");
        return;
      }

      setChoosedIdCar(id);
    }, 3000);
  };
  // nút hủy dùng discount car
  const handleCancelDiscountCar = (index, id) => {
    // set trạng thái loading của nút là true
    setLoadingButtonsCar((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    // thời gian chạy loading là false, đồng thời gọi api check
    setTimeout(async () => {
      setLoadingButtonsCar((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
      setChoosedIdCar(-1);
    }, 3000);
  };
  if(choosedIdCar != -1){
    form.setFieldsValue({
      discountCarId: choosedIdCar, // phiếu giảm giá xe
    })
  }
  if(choosedId != -1){
    form.setFieldsValue({
      discountHotelId: choosedId, // phiếu giảm giá khách sạn
    })
  }
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
            <p className="score">{property.avgReviewScore.toFixed(1)}</p>
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
                <b>Tổng tiền khách sạn: </b>
                {getFormatPrice(totalPaymentHotel)}
              </p>
              {priceCar > 0 && (
                <p>
                  <b>Giá xe: </b>
                  {getFormatPrice(priceCar)}
                </p>
              )}
              <p>
                <b>Khuyến mãi: </b>- {getFormatPrice(totalPromotion)}
              </p>
              <p>
                <b>Giảm giá khách sạn: </b>- {getFormatPrice(priceDiscount)}
              </p>
              <p>
                <b>Giảm giá đặt xe: </b>- {getFormatPrice(priceDiscountCar)}
              </p>
              <p>
                <b>Tổng tiền ban đầu: </b>
                <span className="">{getFormatPrice(totalOrderOld)}</span>
              </p>
            </div>

            <p>
              <b>Tổng tiền: </b>
              {getFormatPrice(totalOrderNew)}
            </p>
          </div>
        </div>
      </div>
      {myDiscountHotels && myDiscountHotels.length > 0 && (
        <div className="booking-discounts">
          <div className="booking-discounts__header">
            <p>Mã giảm giá khách sạn</p>
          </div>
          {myDiscountHotels.map((item, index) => (
            <>
              <Badge.Ribbon
                text={
                  item.discountType == "PERCENT"
                    ? `${item.discountValue}%`
                    : `${getFormatPrice(item.discountValue)}`
                }
                color="red"
                key={index}
              >
                <div className="booking-discounts__item">
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
                        onClick={() => handleUseDiscount(index, item.id)}
                        loading={loadingButtons[index]}
                      >
                        Sử dụng
                      </Button>
                    ) : (
                      <Button
                        color="danger"
                        variant="solid"
                        onClick={() => handleCancelDiscount(index, item.id)}
                        loading={loadingButtons[index]}
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
      {myDiscountCars && myDiscountCars.length > 0 && (
        <div className="booking-discounts">
          <div className="booking-discounts__header">
            <p>Mã giảm giá đặt xe</p>
          </div>
          {myDiscountCars.map((item, index) => (
            <>
              <Badge.Ribbon
                text={`${item.discountValue}%`}
                color="red"
                key={index}
              >
                <div className="booking-discounts__item">
                  <div className="booking-discounts__item__image">
                    <img src={item.images} />
                  </div>
                  <div className="booking-discounts__item__content">
                    <p className="discount-code">{item.code}</p>
                    <p>
                      <b>Thời gian áp dụng: </b>
                      {getDate(item.startDate)} - {getDate(item.endDate)}
                    </p>
                  </div>
                  <div className="booking-discounts__item__use">
                    {choosedIdCar != item.id ? (
                      <Button
                        type="primary"
                        onClick={() => handleUseDiscountCar(index, item.id)}
                        loading={loadingButtonsCar[index]}
                      >
                        Sử dụng
                      </Button>
                    ) : (
                      <Button
                        color="danger"
                        variant="solid"
                        onClick={() => handleCancelDiscountCar(index, item.id)}
                        loading={loadingButtonsCar[index]}
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
