import { use, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getPropertiesBySearch,
  getPropertiesFilterAfterSearch,
} from "../../service/RoomService/SearchService";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Pagination,
  Row,
  Select,
  Skeleton,
  Slider,
} from "antd";
import "./search.scss";
import ListSearchProperties from "../../components/ListSearchProperties";
import { getFacilities } from "../../service/RoomService/FacilityService";
import { formatLocalDateTime } from "../../utils/format";
import { addParamIfExists } from "../../utils/appendParams";
import { SearchContext } from "../../layout/LayoutDefault";
function Search() {
  const [quantityBeds, setQuantityBeds] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedReview, setSelectedReview] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState([]);
  const [budget, setBudget] = useState();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [sortCondition, setSortCondition] = useState("0");
  const [facilities, setFacilities] = useState([]);
  const { searchTrigger } = useContext(SearchContext);
  const [params, setParams] = useState(new URLSearchParams());
  const [shouldResetPageNo, setShouldResetPageNo] = useState(false);
  const [searchParams] = useSearchParams();
  const filter = useMemo(
    () => ({
      quantityBeds,
      rating: selectedRating,
      facilities: selectedFacilities,
      reviewScore: selectedReview,
      distance: selectedDistance,
      propertyType: selectedProperty,
      budget: budget,
      sortCondition: sortCondition,
    }),
    [
      quantityBeds,
      selectedRating,
      selectedFacilities,
      selectedReview,
      selectedDistance,
      selectedProperty,
      budget,
      sortCondition,
    ]
  );

  const buildParams = (customPageNo = pageNo) => {
    const newSearchRequest = {
      destination: searchParams.get("destination") || null,
      checkIn: searchParams.get("checkIn")
        ? formatLocalDateTime(searchParams.get("checkIn"))
        : null,
      checkOut: searchParams.get("checkOut")
        ? formatLocalDateTime(searchParams.get("checkOut"))
        : null,
      quantityBeds: searchParams.get("quantityBeds") || null,
    };
    const { destination, checkIn, checkOut, quantityBeds } = newSearchRequest;
    console.log("newSearchRequest", newSearchRequest);
    const newParams = new URLSearchParams();
    addParamIfExists(newParams, "destination", destination);
    addParamIfExists(newParams, "checkIn", checkIn);
    addParamIfExists(newParams, "checkOut", checkOut);
    addParamIfExists(newParams, "quantityBeds", quantityBeds);
    addParamIfExists(newParams, "pageNo", customPageNo);
    addParamIfExists(newParams, "pageSize", pageSize);
    return newParams;
  };
  useEffect(() => {
    setShouldResetPageNo((shouldResetPageNo) => !shouldResetPageNo);
  }, [filter, searchTrigger]);
  useEffect(() => {
    setQuantityBeds(0);
    setSelectedRating([]);
    setSelectedFacilities([]);
    setSelectedReview([]);
    setSelectedDistance([]);
    setSelectedProperty([]);
    setBudget(0);
    setSortCondition("0");
  }, [searchTrigger]);

  // Reset page về 1 duy nhất 1 lần khi cần
  useEffect(() => {
    setPageNo(1);
  }, [shouldResetPageNo]);
  // Khi pageNo hoặc searchTrigger thay đổi → build lại params
  useEffect(() => {
    const newParams = buildParams(pageNo);
    console.log("newParams:", newParams.toString());
    setParams(newParams);
  }, [pageNo, searchParams]);
  useEffect(() => {
    const newParams = buildParams(1);
    console.log("newParams:", newParams.toString());
    setParams(newParams);
  }, [filter]);
  useEffect(() => {
    const fetchApi = async () => {
      const resFacility = await getFacilities();
      console.log(resFacility);
      if (resFacility.code == 200) {
        setFacilities(resFacility.data);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const isDefaultFilter =
      JSON.stringify(filter) ===
      JSON.stringify({
        quantityBeds: 0,
        rating: [],
        facilities: [],
        reviewScore: [],
        distance: [],
        propertyType: [],
        budget: 0,
        sortCondition: "0",
      });

    const fetchApi = async () => {
      try {
        setLoading(true);
        let res;
        if (isDefaultFilter) {
          console.log("--------- Gọi API search--------- ");

          res = await getPropertiesBySearch(params.toString());
        } else {
          console.log("--------- Gọi API filter--------- ");
          console.log("filter",filter);
          res = await getPropertiesFilterAfterSearch(params.toString(), filter);
        }
        console.log("params:", params.toString());
        console.log("res",res);
        console.log(pageNo);
        if (res.code === 200) {
          setData(res.data.dataPage);
          setTotal(res.data.total);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
          setLoading(false);
      }
    };

    if (params.toString()) {
        fetchApi();
    }
  }, [params.toString(), filter]);
  // thay đổi thay trượt giá
  const handleBudgetChange = (e) => {
    setBudget(e);
    setPageNo(1);
  };
  // tăng số lượng giường
  const handleDecrease = () => {
    if (quantityBeds > 1) {
      setQuantityBeds((quantityBeds) => quantityBeds - 1);
      setPageNo(1);
    }
  };
  // giảm số lượng giường
  const handleIncrease = () => {
    if (quantityBeds <= 3) {
      setQuantityBeds((quantityBeds) => quantityBeds + 1);
      setPageNo(1);
    }
  };
  // xử lý sắp xếp
  const handleSelectChange = (e) => {
    setSortCondition(e);
    setPageNo(1);
  };
  return (
    <>
      <Row gutter={[20, 20]}>
        {/* Filter */}
        <Col span={6}>
          <div className="map">
            <img
              src="https://th.bing.com/th/id/OIP.-QuVfq51mN6d80MDH16pUQHaD4?rs=1&pid=ImgDetMain"
              style={{ width: "200px" }}
            />
          </div>
          <Card title="Bộ lọc" style={{ width: 200, padding: 0 }}>
            <div className="filter">
              <div className="filter__budget">
                <h3 style={{ margin: 0, marginBottom: "50px" }}>
                  Tài chính của bạn
                </h3>
                <Slider
                  value={budget}
                  max={5000000}
                  step={50000}
                  tooltip={{
                    open: true,
                    formatter: (value) => `${value.toLocaleString()} VND`,
                  }}
                  onChange={handleBudgetChange}
                />
              </div>
              <div className="filter__rating">
                <h3>Xếp hạng</h3>
                <Checkbox.Group
                  className="group"
                  value={selectedRating}
                  options={[
                    { label: "1 sao", value: 1 },
                    { label: "2 sao", value: 2 },
                    { label: "3 sao", value: 3 },
                    { label: "4 sao", value: 4 },
                    { label: "5 sao", value: 5 },
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
                    { label: "Homestay", value: "Homestay" },
                  ]}
                  value={selectedProperty}
                  onChange={(checkedValues) =>
                    setSelectedProperty(checkedValues)
                  }
                />
              </div>
              <div className="filter__quantitybeds">
                <h3>Số lượng giường</h3>
                <div className="filter__quantitybeds__action">
                  <Button onClick={handleDecrease}>-</Button>
                  <input type="number" min={1} value={quantityBeds} max={4} />
                  <Button onClick={handleIncrease}>+</Button>
                </div>
              </div>
              <div className="filter__facilities ">
                <h3>Tiện ích</h3>
                <Checkbox.Group
                  className="group"
                  value={selectedFacilities}
                  onChange={(checkedValues) =>
                    setSelectedFacilities(checkedValues)
                  }
                >
                  {(showMore ? facilities : facilities.slice(0, 3)).map(
                    (item, index) => (
                      <Checkbox key={index} value={item.id}>
                        {item.name}
                      </Checkbox>
                    )
                  )}
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
                  onChange={(checkedValues) =>
                    setSelectedDistance(checkedValues)
                  }
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
          {loading == false ? (
            <>
              <Select
                defaultValue="Sắp xếp"
                style={{ width: 240, marginBottom: "20px" }}
                onChange={handleSelectChange}
                value={sortCondition}
                options={[
                  { value: "price-asc", label: "Giá tăng dần" },
                  { value: "price-desc", label: "Giá giảm dần" },
                  { value: "ratingStar-asc", label: "Xếp lọai tăng dần" },
                  { value: "ratingStar-desc", label: "Xếp lọai giảm dần" },
                  { value: "avgReviewScore-asc", label: "Đánh giá tăng dần" },
                  { value: "avgReviewScore-desc", label: "Đánh giá giảm dần" },
                  {
                    value: "distanceFromCenter-asc",
                    label: "Khoảng cách tăng dần",
                  },
                  {
                    value: "distanceFromCenter-desc",
                    label: "Khoảng cách giảm dần",
                  },
                  { value: "0", label: "Sắp xếp" },
                ]}
              />
              <div className="property">
                <ListSearchProperties data={data} />
              </div>
              <Pagination
                current={pageNo}
                total={total}
                pageSize={pageSize}
                onChange={(page) => setPageNo(page)}
              />
              ;
            </>
          ) : (
            <Skeleton active />
          )}
        </Col>
      </Row>
    </>
  );
}
export default Search;
