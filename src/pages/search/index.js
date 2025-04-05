import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPropertiesBySearch, getPropertiesFilterAfterSearch } from "../../service/SearchService";
import { Button, Card, Checkbox, Col, Pagination, Row, Select, Skeleton, Slider } from "antd";
import "./search.scss";
import ListSearchProperties from "../../components/ListSearchProperties";
import { getFacilities } from "../../service/FacilityService";
function Search() {
  const [searchParams] = useSearchParams();
  const [quantityBeds,setQuantityBeds]=useState(0);
  const [showMore,setShowMore] = useState(false);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedFacilities,setSelectedFacilities]=useState([]);
  const [selectedReview, setSelectedReview] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState([]);
  const [budget,setBudget]=useState();
  const [data,setData] = useState([]);
  const [total,setTotal]=useState();
  const [pageNo,setPageNo]=useState(1);
  const [pageSize,setPageSize]=useState(10);
  const [loading,setLoading] = useState(false);
  const [sortCondition,setSortCondition]=useState("0");
  const [facilities,setFacilities]=useState([]);
  const filter = useMemo(() => ({
    quantityBeds,
    rating: selectedRating,
    facilities: selectedFacilities,
    reviewScore: selectedReview,
    distance: selectedDistance,
    propertyType: selectedProperty,
    budget:budget,
    sortCondition:sortCondition
  }), [quantityBeds, selectedRating, selectedFacilities, selectedReview, selectedDistance, selectedProperty, budget,sortCondition]);
  const searchRequest = {
    destination: searchParams.get("destination"),
    checkIn: searchParams.get("checkIn") ? searchParams.get("checkIn"):"",
    checkOut: searchParams.get("checkOut") ? searchParams.get("checkOut"):"",
    quantityBeds: searchParams.get("quantityBeds") ? searchParams.get("quantityBeds"):"",
    pageNo:pageNo,
    pageSize:pageSize,
  };

  

  const params = new URLSearchParams();
  const addParamIfExists = (key, value) => {
    if (value) params.append(key, value);
  };
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
        const resFacility=await getFacilities();
        console.log(resFacility);
        if(resFacility.code==200){
          setFacilities(resFacility.data);
        }
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
  }, [pageNo]);
  const prevFilter = useRef(filter);
  useEffect(()=>{
    setLoading(true);
    const fetchApi=async()=>{
      try{
        addParamIfExists("destination", searchRequest.destination);
        addParamIfExists("checkIn", searchRequest.checkIn);
        addParamIfExists("checkOut", searchRequest.checkOut);
        addParamIfExists("quantityBeds", searchRequest.quantityBeds);
        addParamIfExists("pageNo", searchRequest.pageNo);
        addParamIfExists("pageSize", searchRequest.pageSize);
        const result = await getPropertiesFilterAfterSearch(params.toString(),filter);
        console.log(filter);
        console.log(result);
        if(result.code==200){
          setData(result.data.dataPage);
          setTotal(result.data.total);
          setPageNo(result.data.pageNo);
          setPageSize(result.data.pageSize);
        }
      }catch(error){
        console.error(error);
      }
      finally {
        setLoading(false); // Kết thúc tải dữ liệu
      }
      
    }
    if (JSON.stringify(prevFilter.current) !== JSON.stringify(filter)){
      prevFilter.current = filter;
        setTimeout(()=>{
          fetchApi();
        },1000)
    }
    else{
      setLoading(false);
    }

  },[filter,pageNo]);
  // thay đổi thay trượt giá
  const handleBudgetChange=(e)=>{
    setBudget(e);
  }
  // tăng số lượng giường
  const handleDecrease=()=>{
    if(quantityBeds>1) setQuantityBeds(quantityBeds-1);
  }
  // giảm số lượng giường
  const handleIncrease=()=>{
    if(quantityBeds<=3)setQuantityBeds(quantityBeds+1);
  }
  // xử lý sắp xếp
  const handleSelectChange=(e)=>{
    setSortCondition(e);
  }
  return(
    <>
      <Row gutter={[20,20]}>

        {/* Filter */}
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
                  <input type="number" min={1} value={quantityBeds} max={4}/>
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
                    { label: "5-8", value: "5-8" },
                    { label: "8-9", value: "8-9" },
                    { label: "9-10", value: "9-19" },
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

        {/* Giá trị trả về */}
        <Col span={18}>
          {loading==false ? (
            <>
              <h2>{total} properties found</h2>
              <Select
                defaultValue="Sắp xếp"
                style={{ width: 240,marginBottom:"20px" }}
                onChange={handleSelectChange}
                value={sortCondition}
                options={[
                  { value: 'price-asc', label: 'Giá tăng dần' },
                  { value: 'price-desc', label: 'Giá giảm dần' },
                  { value: 'ratingStar-asc', label: 'Xếp lọai tăng dần' },
                  { value: 'ratingStar-desc', label: 'Xếp lọai giảm dần' },
                  { value: 'avgReviewScore-asc', label: 'Đánh giá tăng dần' },
                  { value: 'avgReviewScore-desc', label: 'Đánh giá giảm dần' },
                  { value: 'distanceFromCenter-asc', label: 'Khoảng cách tăng dần' },
                  { value: 'distanceFromCenter-desc', label: 'Khoảng cách giảm dần' },
                  { value: '0', label: 'Sắp xếp' },
                ]}
              />
              <div className="property">
                  <ListSearchProperties data={data}  />
              </div>
              <Pagination current={pageNo} total={total} pageSize={pageSize} onChange={(page)=>setPageNo(page)}/>; 
            </>
          ):(
            <Skeleton active />
          )}   
        </Col>

      </Row>
    </>
  )
}
export default Search;
