import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import location_icon from "../../images/location-icon.jpg";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import "./PropertyDetail.scss";
import { Card, Col, Row } from "antd";
import RoomAvailability from "../../components/RoomAvailability";
import { getPropertyBySlug } from "../../service/RoomService/PropertyService";
import { getRoomTypesBySlugProperty } from "../../service/RoomService/RoomTypeService";
function PropertyDetail(){
  const [item,setItem] = useState();
  const [tym,setTym] = useState(false);
  const [showMore,setShowMore]=useState(false);
  const [roomTypes,setRoomTypes]=useState();
  const params =useParams();
  useEffect(()=>{
    const propertiesFavortite = localStorage.getItem("properties_favor") ? JSON.parse(localStorage.getItem("properties_favor")) : [];
    const existItem = propertiesFavortite.find(slug=>slug==params.slug);
    if(existItem){
      setTym(true);
    }
    const fetchApi =async ()=>{
      try{
        const res = await getPropertyBySlug(`${params.slug}`);
        const resRoomTypes=await getRoomTypesBySlugProperty(`slugProperty=${params.slug}`);
        if(res.code==200){
          setItem(res.data);
        }
        if(resRoomTypes){
          setRoomTypes(resRoomTypes.data);
        }
      }catch(error){
        console.error(error);
      }

    }
    fetchApi();
  },[]);
  // Xử lý thêm vào danh sách yêu thích
  const handleClickTym=(slug)=>{
    const propertiesFavortite = localStorage.getItem("properties_favor") ? JSON.parse(localStorage.getItem("properties_favor")) : [];
    if(tym==false){
      const existItem = propertiesFavortite.find(slug=>slug==params.slug);
      if(!existItem){
        propertiesFavortite.push(slug);
      }
    }
    else{
      const index = propertiesFavortite.findIndex(slug=>slug==params.slug);
      if(index!==-1){
        propertiesFavortite.splice(index,1);
      }
    }
    setTym(!tym);
    localStorage.setItem("properties_favor",JSON.stringify(propertiesFavortite));
  }
  return(
    <>
      {item && (
        <div className="property">
          <div className="property__header">
            <div className="property__header__content">
              <h2>{item.name}</h2>
              <div className="property__header__content__address">
                <img src={location_icon} />
                <h3>{item.address}</h3>
              </div>
              {tym ? (
                <HeartFilled className="icon icon--active" onClick={()=>handleClickTym(item.slug)}/>
              ):(
                <HeartOutlined className="icon" onClick={()=>handleClickTym(item.slug)}/>
              )}
            </div>
          </div>
          <div className="property__body">
            <Row gutter={[16,16]}>
              <Col span={20}>
                <Row gutter={[16, 16]}>
                  {/* Cột bên trái với ảnh lớn */}
                  <Col span={16}>
                    <img 
                      src={item.images[0]} 
                      alt="Large Image" 
                      style={{ width: "100%", height: "auto", borderRadius: "8px" }} 
                    />
                  </Col>

                  {/* Cột bên phải với 2 ảnh nhỏ */}
                  <Col span={8}>
                    <Col span={24} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      {/* Ảnh nhỏ 1 */}
                      <Col span={24} style={{ flex: 1 ,marginBottom:"5px"}}>
                        <img 
                          src={item.images[1]} 
                          alt="Small Image 1" 
                          style={{ width: '100%', height: '100%', borderRadius: '8px' }} 
                        />
                      </Col>

                      {/* Ảnh nhỏ 2 */}
                      <Col span={24} style={{ flex: 1 }}>
                        <img 
                          src={item.images[2]} 
                          alt="Small Image 2" 
                          style={{ width: '100%', height: '100%', borderRadius: '8px' }} 
                        />
                      </Col>
                    </Col>
                  </Col>
                </Row>
              </Col>
              <Col span={4}>
                <Card size="small" title="Đánh giá"  style={{ width: "300px" }}>
                  <p>Đánh giá</p>
                  <p>Lorem</p>
                </Card>
                <div className="map" style={{marginTop:"45px"}}>
                  <img src="https://th.bing.com/th/id/OIP.-TMzwF-Nx7xrhvOdXqXp7QHaGR?rs=1&pid=ImgDetMain" style={{width:"300px"}}/>
                </div>
              </Col>
              <Col span={20}>
                <div className="property__body__overview">
                  <p>{item.overview}</p>
                </div>
              </Col>
              <Col span={4} >
                <Card size="small" title="Tiện ích"  style={{ width: "300px" }} className="property__body__facilities">
                  
                  {showMore==false ? (
                    <>
                      <ul>
                        {item.facilities.slice(0,5).map((facility,index)=>(
                          <li key={index}>
                            {facility}
                          </li>
                        ))}
                      </ul>
                      <p onClick={()=>setShowMore(true)}>Xem thêm ({item.facilities.length -5})</p>
                    </>
                  ):(
                    <>
                      <ul>
                        {item.facilities.map((facility,index)=>(
                          <li key={index}>
                            {facility}
                          </li>
                        ))}
                      </ul>
                      <p onClick={()=>setShowMore(false)}>Ẩn bớt</p>
                    </>
                  )}
                </Card>
              </Col>
              <Col span={24}>
                <RoomAvailability roomTypes={roomTypes}/>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  )
}
export default PropertyDetail;