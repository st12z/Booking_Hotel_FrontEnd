import { useEffect, useMemo, useState } from "react";
import {
  getAllProperties,
  getPropertiesByKeyword,
} from "../../../service/RoomService/PropertyService";
import { Button, Input, Rate, Select, Table } from "antd";
import { EyeOutlined, DeleteOutlined, SearchOutlined,FilterOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { get } from "../../../utils/requestRoomService";
function Properties() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState();
  const [keyword, setKeyword] = useState("");
  const [rateStar,setRateStar]=useState();
  const [topBill,setTopBill]=useState();
  const [topRevenue,setTopRevenue] = useState();
  const [propertyType,setPropertyType]=useState();
  const filter=useMemo(()=>({
    rateStar:rateStar,
    keyword: keyword,
    topBill:topBill,
    topRevenue:topRevenue,
    propertyType:propertyType
  }),[keyword,rateStar,topBill,topRevenue,propertyType]);
  
  useEffect(() => {
    const fetchApi = async () => {
      try {
        
        const  res = await getPropertiesByKeyword(keyword, pageNo, pageSize);
        console.log(res);
        if (res.code == 200) {
          setTotal(res.data.total);
          setData(res.data.dataPage);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [pageNo, keyword]);
  const columns = [
    {
      title: "Mã khách sạn",
      key: "id",
      render: (_, record) => (
        <>
          <p>
            <b>{record.id}</b>
          </p>
        </>
      ),
    },
    {
      title: "Tên",
      key: "name",
      render: (_, record) => (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <b>{record.name}</b>
            <img
              src={record.images[0]}
              style={{ width: "150px", borderRadius: "5px" }}
            />
          </div>
        </>
      ),
      width: 200,
    },
    {
      title: "Địa chỉ",
      key: "address",
      render: (_, record) => (
        <>
          <p>{record.address}</p>
        </>
      ),
      width: 200,
    },
    {
      title: "Loại",
      key: "propertyType",
      render: (_, record) => (
        <>
          <p>{record.propertyType}</p>
        </>
      ),
    },
    {
      title: "Xếp hạng",
      key: "propertyType",
      render: (_, record) => (
        <>
          <p>
            <Rate value={record.ratingStar} disabled={true} />
          </p>
        </>
      ),
    },
    {
      title: "Hành động",
      key: "payment",
      render: (_, record) => (
        <div style={{ display: "flex" }}>
          <Button style={{ marginRight: "10px" }}>
            <Link to={``}>{<EyeOutlined />}</Link>
          </Button>
        </div>
      ),
    },
  ];
  // Xử lý tìm kiếm
  let timeout = null;
  const handleChangeInput = (e) => {
    const keyword = e.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setKeyword(keyword);
    }, 1000);
  };
  // Xử lý select change
  const handleChangeRateStar = (e) => {
    setRateStar(e);
  };
  // Xử lý top bills
  const handleChangeTopBill=(e)=>{
    setTopBill(e);
  }
  // Xử lý top payments
  const handleChangeTopRevenue=(e)=>{
    setTopRevenue(e);
  }
  // Xử lý loại khách sạn
  const handleChangePropertyType=(e)=>{
    setPropertyType(e);
  }
  return (
    <>
      <div className="" style={{ marginBottom: "20px", position: "relative" }}>
        <Input
          onChange={handleChangeInput}
          style={{ width: "50%", marginRight: "20px" }}
        />
        <SearchOutlined
          style={{
            position: "absolute",
            right: "50%",
            fontSize: "18px",
            top: "20%",
          }}
        />
      </div>
      <div style={{marginBottom:"20px"}}>
        <Select
          defaultValue="0"
          style={{ width: 120,marginRight:"20px" }}
          onChange={handleChangeRateStar}
          options={[
            { value: "0", label: "Đánh giá" },
            { value: "1", label: "1 sao" },
            { value: "2", label: "2 sao" },
            { value: "3", label: "3 sao" },
            { value: "4", label: "4 sao" },
            { value: "5", label: "5 sao" },
          ]}
        />
        <Select
          defaultValue="0"
          style={{ width: 240,marginRight:"20px" }}
          onChange={handleChangeTopBill}
          options={[
            { value: "0", label: "Top khách sạn theo hóa đơn" },
            { value: "5", label: "Top 5 khách sạn theo hóa đơn" },
            { value: "10", label: "Top 10 khách sạn theo hóa đơn" },
            { value: "30", label: "Top 30 khách sạn theo hóa đơn" },
            { value: "50", label: "Top 50 khách sạn theo hóa đơn" },
          ]}
        />
        <Select
          defaultValue="0"
          style={{ width: 240,marginRight:"20px" }}
          onChange={handleChangeTopRevenue}
          options={[
            { value: "0", label: "Top khách sạn theo tiền thu" },
            { value: "5", label: "Top 5 khách sạn theo tiền thu" },
            { value: "10", label: "Top 10 khách sạn theo tiền thu" },
            { value: "30", label: "Top 30 khách sạn theo tiền thu" },
            { value: "50", label: "Top 50 khách sạn theo tiền thu" },
          ]}
        />
        <Select
          defaultValue="0"
          style={{ width: 240,marginRight:"20px" }}
          onChange={handleChangePropertyType}
          options={[
            { value: "0", label: "Loại khách sạn" },
            { value: "Hotel", label: "Hotel" },
            { value: "Apartment", label: "Apartment" },
            { value: "Villa", label: "Villa" },
            { value: "Resort", label: "Resort" },
            { value: "Homestay", label: "Homestay" },
          ]}
        />
        <Button type="primary">
          <FilterOutlined />
          Lọc
        </Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          current: pageNo,
          pageSize: pageSize,
          total: total,
          onChange: (page, pageSize) => {
            setPageNo(page);
            setPageSize(pageSize);
          },
        }}
      />
    </>
  );
}
export default Properties;
