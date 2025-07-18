import { Button, Input, Table } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllFacilitiesByPage } from "../../../service/RoomService/FacilityService";
function Facilities() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
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
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button style={{ marginRight: "10px" }}>
          <Link to={`/admin/facilities/edit/${record.id}`}>
            {<EditOutlined />}
          </Link>
        </Button>
      ),
    },
  ];
  const fetchApi = async (pageNo) => {
    try {
      const res = await getAllFacilitiesByPage(keyword,pageNo,pageSize);
      console.log(res);
      if (res.code == 200) {
        setData(res.data.dataPage);
        setTotal(res.data.total);
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
  useEffect(()=>{
    fetchApi(pageNo);
  },[pageNo]);
  return (
    <>
      <h2>Danh sách tiện ích</h2>
      <Button color="green" variant="solid" style={{ marginBottom: "20px" }}>
        <Link to="/admin/facilities/create">
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
export default Facilities;
