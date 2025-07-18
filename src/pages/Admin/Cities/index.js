import { useEffect, useState } from "react";
import {
  getAllCities,
  getAllCitiesByPage,
  getCitiesByKeyword,
} from "../../../service/RoomService/CityService";
import { Button, Input, Table } from "antd";
import {
  PrinterOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  exportListCities,
  exportPaymentTranLogs,
} from "../../../service/ExportService/ExportService";
import { getDate } from "../../../utils/format";
import { Link } from "react-router-dom";
function Cities() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [timeOption, setTimeOption] = useState(0);
  const [sortOption, setSortOption] = useState(0);
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getAllCitiesByPage(pageNo, pageSize);
        if (res.code == 200) {
          setTotal(res.data.total);
          setData(res.data.dataPage);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  const handleChangeInput = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearch = async () => {
    try {
      const res = await getCitiesByKeyword(keyword, pageNo, pageSize);
      if (res.code == 200) {
        setTotal(res.data.total);
        setData(res.data.dataPage);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };
  useEffect(() => {
    if (keyword) {
      handleSearch();
    }
  }, [pageNo]);
  const handleExport = async () => {
    try {
      const blob = await exportListCities();
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cities.xls";
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
      title: "Tên thành phố",
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
      title: "Ảnh thành phố",
      key: "name",
      render: (_, record) => (
        <>
          <img src={record.image} style={{ width: "150px" }} />
        </>
      ),
    },
    {
      title: "Slug",
      key: "slug",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.slug}</b>
          </p>
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
          <Link to={`/admin/cities/edit/${record.id}`}>{<EditOutlined />}</Link>
        </Button>
      ),
    },
  ];
  return (
    <>
      <h2>Danh sách thành phố</h2>
      <Button color="green" variant="solid" style={{ marginBottom: "20px" }}>
        <Link to="/admin/cities/create">
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
          },
        }}
      />
    </>
  );
}
export default Cities;
