import { Col, Row } from "antd";
import { getPropertiesBySuggest } from "../../service/PropertyService";
import { useEffect, useState } from "react";
import "./InterestedProperties.scss"
function InterestedProperties(){
   const properties = localStorage.getItem("properties") ? JSON.parse(localStorage.getItem("properties")) : [];
    console.log(properties);
    const [data,setData] = useState([]);
    useEffect(()=>{
        const fetchApi = async () => {
          try{
            const res = await getPropertiesBySuggest(properties);
            console.log(res);
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
        <Col span={4}>
            <a href={`/search?property=${item.name}`}>
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