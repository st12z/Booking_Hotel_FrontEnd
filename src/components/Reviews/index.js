import CustomerReviews from "../CustomerReviews";
import FormReview from "../FormReview";

function Reviews({property}){
  return(
    <>
      <div className="reviews">
        <CustomerReviews property={property}/>
        <FormReview propertyId={property.id}/>
      </div>
    </>
  )
}
export default Reviews;