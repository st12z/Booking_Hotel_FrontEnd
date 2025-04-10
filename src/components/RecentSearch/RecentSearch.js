import { useEffect, useState } from "react";
import { getDestinationsBySuggest} from "../../service/RoomService/DestinationService";
import { Col, Row } from "antd";
import "./RecentSearch.scss";
import { Link } from "react-router-dom";
function RecentSearch(){
  const destinations = localStorage.getItem("destinations") ? JSON.parse(localStorage.getItem("destinations")) : [];
  const [data,setData] = useState([]);
  useEffect(()=>{
      const fetchApi = async () => {
        try{
          const res = await getDestinationsBySuggest(destinations);
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
      <h1>Tìm kiếm gần đây</h1>
      <Row gutter={[16, 16]}>
      {data?.map((item,index)=>(
        <Col span={4} key={index}>
            <Link to={`/search?destination=${item.name}`}>
              <div className="destination-suggest" key={index}>
                <img src={item.image}/>
                <div className="destination-suggest__name">
                  <h3>{item.name}</h3>
                </div>
              </div>
            </Link>
        </Col>
      ))}
      </Row>
    </>
  )
}
export default RecentSearch;