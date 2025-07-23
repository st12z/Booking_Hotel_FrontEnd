import Discounts from "../../components/Discounts";
import InterestedProperties from "../../components/InterestedProperties/InterestedProperties";
import RecentSearch from "../../components/RecentSearch/RecentSearch";
import Destinations from "../../components/Destinations";
import TripPlanner from "../../components/TripPlanner/TripPlanner";
import { useEffect } from "react";
import DiscountCars from "../../components/DiscountCars";
import { useSelector } from "react-redux";
import { updateVisits } from "../../service/UserService/AuthService";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { API_DOMAIN_SOCKET } from "../../utils/variable";
import { connectStomp } from "../../utils/connectStomp";
function Home() {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await updateVisits(user.id);
        console.log(res);
        connectStomp("/app/sendUpdateVisits",res.data)
      } catch (error) {
        console.log(error);
      }
    };
    if(user){
      fetchApi();
    }
  }, []);
  return (
    <>
      <RecentSearch />
      <InterestedProperties />
      <Discounts />
      <DiscountCars />
      <Destinations />
      <TripPlanner />
    </>
  );
}
export default Home;
