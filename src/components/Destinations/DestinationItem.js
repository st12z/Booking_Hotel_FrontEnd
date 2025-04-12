import { Link } from "react-router-dom";

function DestinationItem(props){
  const {item}=props;
  const handleAddPropertiesLocal=(name)=>{
    let destinations = localStorage.getItem("destinations") ? JSON.parse(localStorage.getItem("destinations")) : [];
    if(destinations.length== 0){
      destinations.push(name);
    }
    else{
      const index = destinations.indexOf(name);
      if(index == -1){
        destinations.push(name);
      }
    }
    localStorage.setItem("destinations", JSON.stringify(destinations));
  }
  return(
    <>
      <div className="destination__item">
          <img src={item.image} alt={item.name}/>
          <h3>{item.name}</h3>
      </div>
    </>
  )
}
export default DestinationItem;