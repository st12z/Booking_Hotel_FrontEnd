import beachIcon from "../../images/beach-icon.jpg";
import mountainIcon from "../../images/mountain-icon.jpg";
import outdoorIcon from "../../images/outdoor-icon.jpg";
function TripPlanner(){
  return(
    <>
      <h1>Kế hoạch chuyến đi</h1>
      <div className="trip-type">
        <ul>
          <li>
            <img src={outdoorIcon} alt="Outdoor" />
            <span>Ngoài trời</span>
          </li>
          <li>
            <img src={beachIcon} alt="Beach" />
            <span>Bãi biển</span>
          </li>
          <li>
            <img src={mountainIcon} alt="Mountain" />
            <span>Núi</span>
          </li>
        </ul>
      </div>
    </>
  )
}
export default TripPlanner;