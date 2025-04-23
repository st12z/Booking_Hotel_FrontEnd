import { Col, Row } from "antd";
import "./Destinations.scss"
import DestinationItem from "./DestinationItem";
import ExporeVietNam from "./ExporeVietNam";
import { useEffect, useState } from "react";
import { getAllTrips } from "../../service/RoomService/TripService";
import { getAllCities } from "../../service/RoomService/CityService";
import { Link } from "react-router-dom";
function Destinations(){
  const [dataCities,setdataCities]=useState([]);
  const [dataDestinations,setdataDestinations]=useState([]);
  useEffect(()=>{
    const fetchApi= async()=>{
      try{
        const resCities = await getAllCities();
        const resDestinations = await getAllTrips();
        if(resCities.code==200){
          setdataCities(resCities.data);
          setdataDestinations(resDestinations.data);
        }
      }catch(error){
        console.error(error);
      }
    };
    fetchApi();
  },[]);
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
      <h2>Điểm đến hấp dẫn</h2>
      <Row gutter={[10,10]}>
        {dataCities?.slice(0,5).map((item,index)=>(
          <Col key={index}  span={index<2 ? 12:8}>
          <Link to={`/search?destination=${item.name}`} onClick={()=>handleAddPropertiesLocal(item.name)}>
              <DestinationItem item={item}/>
            </Link>
          </Col>
        ))}
      </Row>
      <ExporeVietNam data={dataDestinations}/>
    </>
  )
}
export default Destinations;