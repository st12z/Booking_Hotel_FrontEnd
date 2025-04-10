import { useEffect, useState } from "react";
import { getPropertyBySlug } from "../../service/RoomService/PropertyService";
import PropertyItem from "../../components/PropertyItem/PropertyItem";

function PropertiesTym(){
  const [data,setData] = useState([]);
  useEffect(()=>{
    const fetchApi =async ()=>{
      const propertiesFavortite = localStorage.getItem("properties_favor") ? JSON.parse(localStorage.getItem("properties_favor")) : [];
      const items=[];
      if(propertiesFavortite.length>0){
        for(const slug of propertiesFavortite){
          try{
            const res = await getPropertyBySlug(`${slug}`);
            if(res.code==200){
              items.push(res.data);
            }
          }catch(error){
            console.error(error);
          }
        }
        setData(items);
      }
    }
    fetchApi();
  },[]);
  console.log(data);
  return(
    <>
      {data?.map((item,index)=>(
        <PropertyItem key={index} item={item}/>
      ))}
    </>
  )
}
export default PropertiesTym;