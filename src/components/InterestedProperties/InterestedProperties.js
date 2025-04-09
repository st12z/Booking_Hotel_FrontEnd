import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import "./InterestedProperties.scss"
import { getPropertiesBySuggest } from "../../service/RoomService/PropertyService";
function InterestedProperties(){
   const properties = localStorage.getItem("properties") ? JSON.parse(localStorage.getItem("properties")) : [];
    const [data,setData] = useState([]);
    useEffect(()=>{
        const fetchApi = async () => {
          try{
            const res = await getPropertiesBySuggest(properties);
            if(res.code==200){
              setData(res.data);
            }
          }catch(error){
            console.error(error);
          }
        }
        fetchApi();
    },[]);
  return(
    <>
      <h1>Bạn vẫn quan tâm đến những chỗ ở này ?</h1>
      <Row gutter={[16, 16]}>
      {data?.map((item,index)=>(
        <Col span={4} key={index}>
            <a href={`/properties/${item.slug}`}>
              <div className="property-suggest" key={index}>
                <img src={item.images.length>0 ? item.images[0] :""} alt=""/>
                <div className="property-suggest__name">
                  <h3>{item.name}</h3>
                </div>
              </div>
            </a>
        </Col>
      ))}
      </Row>
    </>
  )
}
export default InterestedProperties;