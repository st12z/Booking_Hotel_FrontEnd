import "./BookingCustomerDetail.scss"
function BookingCustomerDetail(props){
  const {user}=props.user;
  return(
    <>
      {user && (
        <div className="booking-customer">
          <div className="booking-customer__header">

          </div>
          <div className="booking-customer__body">

          </div>
          <div className="booking-customer__footer">

          </div>
      </div>
      )}
    </>
  )
}
export default BookingCustomerDetail;