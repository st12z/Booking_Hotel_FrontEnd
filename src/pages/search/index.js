import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getPropertiesBySearch } from "../../service/SearchService";

function Search(){
  const [searchParams]=useSearchParams();
  const data={
    destination:searchParams.get("destination") ||"",
    checkIn:searchParams.get("checkIn") || "",
    checkOut:searchParams.get("checkOut") || "",
    quantityBeds:searchParams.get("quantityBeds") || ""
  }
  useEffect(()=>{
    const fetchApi = async () => {
      try{
        const res = await getPropertiesBySearch(`destination=${data.destination}&checkIn=${data.checkIn}&checkOut=${data.checkOut}&quantityBeds=${data.quantityBeds}`);
        if(res.code==200){
          console.log(res.data);
        }
      }catch(error){
        console.log(error);
      }
    }
    fetchApi(); 
  },[data.destination,data.checkIn,data.checkOut,data.quantityBeds]);
  return(
    <>
      Search
    </>
  )
}
export default Search;