import { Col, Row } from "antd";
import "./Destinations.scss"
import DestinationItem from "./DestinationItem";
import ExporeVietNam from "./ExporeVietNam";
function Destinations(){
  const data= [
    {
        "id": 1,
        "name": "Hà Nội",
        "image": "https://cf.bstatic.com/xdata/images/city/600x600/981517.jpg?k=2268f51ad34ab94115ea9e42155bc593aa8d48ffaa6fc58432a8760467dc4ea6&o="
    },
    {
        "id": 2,
        "name": "Hồ Chí Minh",
        "image": "https://cf.bstatic.com/xdata/images/city/600x600/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o="
    },
    {
        "id": 4,
        "name": "Đà Lạt",
        "image": "https://namthientravel.com.vn/wp-content/uploads/2024/09/da-lat.jpg"
    },
    {
        "id": 3,
        "name": "Đà Nẵng",
        "image": "https://vcdn1-dulich.vnecdn.net/2022/06/03/cau-vang-jpeg-mobile-4171-1654247848.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=xrjEn1shZLiHomFix1sHNQ"
    },
    {
        "id": 5,
        "name": "Nha Trang",
        "image": "https://images2.thanhnien.vn/zoom/1200_630/528068263637045248/2025/3/24/nha-trang-17428130131821343548929-60-0-1310-2000-crop-1742813226474598199942.jpg"
    },
    {
      "id": 5,
      "name": "Nha Trang",
      "image": "https://images2.thanhnien.vn/zoom/1200_630/528068263637045248/2025/3/24/nha-trang-17428130131821343548929-60-0-1310-2000-crop-1742813226474598199942.jpg"
    },
    {
      "id": 5,
      "name": "Nha Trang",
      "image": "https://images2.thanhnien.vn/zoom/1200_630/528068263637045248/2025/3/24/nha-trang-17428130131821343548929-60-0-1310-2000-crop-1742813226474598199942.jpg"
    },
    {
      "id": 5,
      "name": "Nha Trang",
      "image": "https://images2.thanhnien.vn/zoom/1200_630/528068263637045248/2025/3/24/nha-trang-17428130131821343548929-60-0-1310-2000-crop-1742813226474598199942.jpg"
    },
    {
      "id": 5,
      "name": "Nha Trang",
      "image": "https://images2.thanhnien.vn/zoom/1200_630/528068263637045248/2025/3/24/nha-trang-17428130131821343548929-60-0-1310-2000-crop-1742813226474598199942.jpg"
    },

  ]
  return(
    <>
      <h1>Điểm đến hấp dẫn</h1>
      <Row gutter={[10,10]}>
        {data?.slice(0,5).map((item,index)=>(
          <Col key={index}  span={index<2 ? 12:8}>
            <a href="/">
              <DestinationItem item={item}/>
            </a>
          </Col>
        ))}
      </Row>
      <ExporeVietNam data={data}/>
    </>
  )
}
export default Destinations;