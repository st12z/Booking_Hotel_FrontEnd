import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPropertiesBySearch } from "../../service/SearchService";
import { Button, Card, Checkbox, Col, Pagination, Row, Slider } from "antd";
import "./search.scss";
import ListSearchProperties from "../../components/ListSearchProperties";
function Search() {
  const [searchParams] = useSearchParams();
  const [quantityBeds,setQuantityBeds]=useState(0);
  const [showMore,setShowMore] = useState(false);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedFacilities,setSelectedFacilities]=useState([]);
  const [selectedReview, setSelectedReview] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState([]);
  const [budget,setBudget]=useState(50000);
  const [data,setData] = useState([]);
  const [total,setTotal]=useState();
  const [pageNo,setPageNo]=useState(1);
  const [pageSize,setPageSize]=useState(10);
  const searchRequest = {
    destination: searchParams.get("destination"),
    checkIn: searchParams.get("checkIn"),
    checkOut: searchParams.get("checkOut"),
    quantityBeds: searchParams.get("quantityBeds"),
    pageNo:searchParams.get("pageNo"),
    pageSize:searchParams.get("pageSize"),
  };

  const facilities=['Parking','Restaurant','Pets allowed','Room service','24-hour front desk','Fitness centre','Air port']
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getPropertiesBySearch(
          `destination=${searchRequest.destination}&checkIn=${searchRequest.checkIn}
          &checkOut=${searchRequest.checkOut}
          &quantityBeds=${searchRequest.quantityBeds}
          &pageNo=${searchRequest.pageNo}
          &pageSize=${searchRequest.pageSize}`
        );
        if (res.code == 200) {
          setData(res.data.dataPage);
          setTotal(res.data.total);
          setPageNo(res.data.pageNo);
          setPageSize(res.data.pageSize);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [searchRequest.destination, searchRequest.checkIn, searchRequest.checkOut, searchRequest.quantityBeds]);
  useEffect(()=>{
    const filterData={
      quantityBeds:quantityBeds,
      rating:selectedRating,
      facilities:selectedFacilities,
      reviewScore:selectedReview,
      distance:selectedDistance,
      propertyType:selectedProperty,
      budget:budget
    }
  },[budget,quantityBeds,selectedDistance,selectedProperty,selectedFacilities,selectedProperty,selectedReview])
  const handleBudgetChange=(e)=>{
    setBudget(e);
  }
  const handleDecrease=()=>{
    if(quantityBeds>1) setQuantityBeds(quantityBeds-1);
  }
  const handleIncrease=()=>{
    setQuantityBeds(quantityBeds+1);
  }
  return(
    <>
      <Row gutter={[20,20]}>
        <Col span={6}>
          <div className="map">
            <img src="https://th.bing.com/th/id/OIP.-TMzwF-Nx7xrhvOdXqXp7QHaGR?rs=1&pid=ImgDetMain" style={{width:"200px"}}/>
          </div>
          <Card title="Bộ lọc" style={{ width: 200,padding:0 }}>
            <div className="filter">
              <div className="filter__budget">
                <h3 style={{margin:0,marginBottom:"50px"}}>Tài chính của bạn</h3>
                <Slider 
                  value={budget} 
                  max={5000000} 
                  step={50000} 
                  tooltip={{ 
                    open: true, 
                    formatter: (value) => `${value.toLocaleString()} VND` 
                  }} 
                  onChange={handleBudgetChange}
                />
              </div>
              <div className="filter__rating">
                <h3>Xếp hạng</h3>
                <Checkbox.Group
                  className="group"
                  options={[
                    { label: "1 sao", value: 1 },
                    { label: "2 sao", value: 2 },
                    { label: "3 sao", value: 3 },
                    { label: "4 sao", value: 4 },
                    { label: "5 sao", value: 5 }
                  ]}
                  onChange={(checkedValues) => setSelectedRating(checkedValues)}
                />
              </div>
              <div className="filter__property">
                <h3>Loại</h3>
                <Checkbox.Group
                  className="group"
                  options={[
                    { label: "Hotel", value: "Hotel" },
                    { label: "Apartment", value: "Apartment" },
                    { label: "Villa", value: "Villa" },
                    { label: "Resort", value: "Resort" },
                    { label: "Homestay", value: "Homestay" }
                  ]}
                  onChange={(checkedValues) => setSelectedProperty(checkedValues)}
                />
              </div>
              <div className="filter__quantitybeds">
                <h3>Số lượng giường</h3>
                <div className="filter__quantitybeds__action">
                  <Button onClick={handleDecrease}>-</Button>
                  <input type="number" min={0} value={quantityBeds} />
                  <Button onClick={handleIncrease}>+</Button>
                </div>
              </div>
              <div className="filter__facilities ">
                <h3>Tiện ích</h3>
                <Checkbox.Group
                  className="group"
                  value={selectedFacilities}
                  onChange={(checkedValues) => setSelectedFacilities(checkedValues)}
                >
                  {(showMore ? facilities : facilities.slice(0, 3)).map((item, index) => (
                    <Checkbox key={index} value={item}>
                      {item}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
                <Button type="default" onClick={() => setShowMore(!showMore)}>
                  {showMore ? "Ẩn bớt" : `Xem thêm (${facilities.length - 3})`}
                </Button>
              </div>
              <div className="filter__reviewscore">
                <h3>Đánh giá</h3>
                <Checkbox.Group
                  className="group"
                  value={selectedReview}
                  onChange={(checkedValues) => setSelectedReview(checkedValues)}
                  options={[
                    { label: "Dưới 5", value: "<5" },
                    { label: "5-7", value: "5-7" },
                    { label: "8-9", value: "8-9" },
                    { label: "10", value: "10" },
                  ]}
                />
              </div>
              <div className="filter__distance group">
                <h3>Khoảng cách từ trung tâm</h3>
                <Checkbox.Group
                  value={selectedDistance}
                  onChange={(checkedValues) => setSelectedDistance(checkedValues)}
                  options={[
                    { label: "Dưới 1km", value: "<1" },
                    { label: "Dưới 3km", value: "<3" },
                    { label: "Dưới 5km", value: "<5" },
                  ]}
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col span={18}>
          <div className="property">
              <ListSearchProperties data={data}  />
          </div>
          <Pagination current={pageNo} total={total} pageSize={pageSize}/>;       
        </Col>
      </Row>
    </>
  )
}
export default Search;
