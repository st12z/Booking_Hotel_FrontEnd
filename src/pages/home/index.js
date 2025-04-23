import Discounts from "../../components/Discounts";
import InterestedProperties from "../../components/InterestedProperties/InterestedProperties";
import RecentSearch from "../../components/RecentSearch/RecentSearch";
import Destinations from "../../components/Destinations";
import TripPlanner from "../../components/TripPlanner/TripPlanner";
import { useEffect } from "react";
import DiscountCars from "../../components/DiscountCars";

function Home(){;
  return(
    <>
      <RecentSearch/>
      <InterestedProperties/>
      <Discounts/>
      <DiscountCars/>
      <Destinations/>
      <TripPlanner/>
    </>
      
  )
}
export default Home;