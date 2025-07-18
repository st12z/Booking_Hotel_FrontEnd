import { useState } from "react";
import MyDiscountHotels from "../../components/MyDiscountHotels";
import MyDiscountCars from "../../components/MyDiscountCars";

function MyDiscounts(){
  const [currentCheckBox,setCurretnCheckBox] = useState([]);
  return(
    <>
      <MyDiscountHotels/>
      <MyDiscountCars/>
    </>
  )
}
export default MyDiscounts;