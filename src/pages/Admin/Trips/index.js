import { useEffect, useState } from "react";
import {
  getAllTrips,
  getAllTripsByPage,
  getAllTripTypes,
} from "../../../service/RoomService/TripService";
import { getDate } from "../../../utils/format";
import { Button, Input, Table, Tag } from "antd";
import { getCityById } from "../../../service/RoomService/CityService";
import { Link } from "react-router-dom";
import {
  SearchOutlined,
  PlusOutlined,
  PrinterOutlined,
  EditOutlined
} from "@ant-design/icons";
import { exportTrips } from "../../../service/ExportService/ExportService";
function Trips() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [triggerSearch,setTriggerSearch] = useState(false);
  const [isSearchMode,setIsSearchMode] = useState(false);
  const fetchApi = async (pageNo) => {
    try {
      const res = await getAllTripsByPage(keyword, pageNo, pageSize);
      console.log(res);
      if (res.code == 200) {
        const newData = [];
        setTotal(res.data.total);
        for (const item of res.data.dataPage) {
          const cityId = item.city_id;
          const resCity = await getCityById(cityId);
          if (resCity.code == 200) {
            newData.push({
              ...item,
              cityName: resCity.data.name,
            });
          }
        }
        console.log(newData);
        setData(newData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeInput = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearch = async () => {
    setPageNo(1);
    setIsSearchMode(true);
    fetchApi(1);
  };
  useEffect(() => {
    if(!isSearchMode){
      fetchApi(pageNo);
    }
  }, [pageNo]);
  const handleExport = async () => {
    try {
      const blob = await exportTrips();
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "trips.xls";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };
  
  const columns = [
    {
      title: "Mã ID",
      key: "id",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.id}</b>
          </p>
        </>
      ),
    },
    {
      title: "Tên địa điểm",
      key: "name",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.name}</b>
          </p>
        </>
      ),
    },
    {
      title: "Ảnh địa điểm",
      key: "image",
      render: (_, record) => (
        <>
          <img src={record.image} style={{ width: "150px" }} />
        </>
      ),
    },
    {
      title: "Tên thành phố",
      key: "cityName",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.cityName}</b>
          </p>
        </>
      ),
    },
    {
      title: "Loại địa điểm",
      key: "tripType",
      render: (_, record) => (
        <>
          <Tag color="blue">{record.tripType}</Tag>
        </>
      ),
    },
    {
      title: "Ngày tạo",
      key: "createdAt",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{getDate(record.createdAt)}</b>
          </p>
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button style={{ marginRight: "10px" }}>
          <Link to={`/admin/trips/edit/${record.id}`}>{<EditOutlined />}</Link>
        </Button>
      ),
    },
  ];
  return (
    <>
      <h2>Danh sách điểm đến</h2>
      <Button color="green" variant="solid" style={{ marginBottom: "20px" }}>
        <Link to="/admin/trips/create">
          <PlusOutlined />
          Tạo mới
        </Link>
      </Button>
      <div className="input_search" style={{ marginBottom: "20px" }}>
        <Input
          onChange={handleChangeInput}
          style={{ width: "50%", marginRight: "20px" }}
        />
        <div className="icon_search" onClick={handleSearch}>
          <SearchOutlined />
          <span>Tìm kiếm</span>
        </div>
        <Button color="primary" variant="solid" onClick={handleExport}>
          <PrinterOutlined />
          Xuất
        </Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          current: pageNo,
          pageSize: pageSize,
          total: total,
          onChange: (page, size) => {
            setPageNo(page);
            setPageSize(size);
            setIsSearchMode(false);
          },
        }}
      />
    </>
  );
}
export default Trips;
