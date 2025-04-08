import { Button, Col, Row } from "antd";
import DiscountItem from "./DiscountItem";
import "./Discount.scss";
import { useEffect, useState } from "react";
import { getAllDiscounts } from "../../service/RoomService/DiscountService";
function Discounts() {
    const [show,setShowAll] = useState(false);
    const [data,setData]=useState([]);
    useEffect(()=>{
      const fetchApi= async()=>{
        try{
          const res = await getAllDiscounts();  
          console.log(res);       
          if(res.code==200){
            setData(res.data);
          }
        }catch(error){
          console.error(error);
        }
      };
      fetchApi();
    },[]);
  return (
    <div>
      <h1>Giảm giá</h1>
      <Row gutter={[24,24]} style={{marginBottom:"10px"}}>
        {show ? (
            data?.map((item,index)=>(
                <Col span={8} key={index}>
                    <DiscountItem item={item}/>
                </Col>
            ))       
        ):(
            data?.slice(0,5).map((item,index)=>(
            <Col span={8} key={index}>
                <DiscountItem item={item}/>
            </Col>
            ))
        )
        }
      </Row>
    {data.length>0 &&<Button type="primary" onClick={()=>setShowAll(!show)} className="discount__btn">
        {show ? "Ẩn bớt" : "Xem thêm"}
    </Button>}
    </div>
  );
}
export default Discounts;