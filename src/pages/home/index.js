import Discounts from "../../components/Discounts";
import InterestedProperties from "../../components/InterestedProperties/InterestedProperties";
import RecentSearch from "../../components/RecentSearch/RecentSearch";
import Destinations from "../../components/Destinations";
import TripPlanner from "../../components/TripPlanner/TripPlanner";

function Home(){
  return(
    <>
      <RecentSearch/>
      <InterestedProperties/>
      <Discounts/>
      <Destinations/>
      <TripPlanner/>
    </>
      
  )
}
export default Home;