import { Col, Row } from "antd";
import "./Destinations.scss"
import DestinationItem from "./DestinationItem";
import ExporeVietNam from "./ExporeVietNam";
import { useEffect, useState } from "react";
import { getAllTrips } from "../../service/RoomService/TripService";
import { getAllCities } from "../../service/RoomService/CityService";
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
      <h1>Điểm đến hấp dẫn</h1>
      <Row gutter={[10,10]}>
        {dataCities?.slice(0,5).map((item,index)=>(
          <Col key={index}  span={index<2 ? 12:8}>
          <a href={`/search?destination=${item.name}`} onClick={()=>handleAddPropertiesLocal(item.name)}>
              <DestinationItem item={item}/>
            </a>
          </Col>
        ))}
      </Row>
      <ExporeVietNam data={dataDestinations}/>
    </>
  )
}
export default Destinations;