import { Button, Input, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDate } from "../../../utils/format";
import {
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { getAllPropertyTypesPage } from "../../../service/RoomService/PropertyTypeService";

function PropertyTypes() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const fetchApi = async (pageNo) => {
    try {
      const res = await getAllPropertyTypesPage(keyword, pageNo, pageSize);
      console.log(res);
      if(res.code==200){
        setTotal(res.data.total);
        setData(res.data.dataPage);
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
    if (!isSearchMode) {
      fetchApi(pageNo);
    }
  }, [pageNo]);
  const handleExport = async () => {
    // try {
    //   const blob = await exportTripTypes();
    //   const url = window.URL.createObjectURL(blob);
    //   console.log(url);
    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download = "trips.xls";
    //   document.body.appendChild(a);
    //   a.click();
    //   a.remove();
    //   window.URL.revokeObjectURL(url);
    // } catch (error) {
    //   console.error(error);
    // }
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
      title: "Tên",
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
          <Link to={`/admin/property-types/edit/${record.id}`}>
            {<EditOutlined />}
          </Link>
        </Button>
      ),
    },
  ];
  return (
    <>
      <h2>Danh sách loại khách sạn</h2>
      <Button color="green" variant="solid" style={{ marginBottom: "20px" }}>
        <Link to="/admin/property-types/create">
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
export default PropertyTypes;
