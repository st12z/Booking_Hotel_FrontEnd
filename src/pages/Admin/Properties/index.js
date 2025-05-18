import { useEffect, useState } from "react";
import {
  getAllProperties,
  getPropertiesByKeyword,
} from "../../../service/RoomService/PropertyService";
import { Button, Input, Rate, Table } from "antd";
import { EyeOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { get } from "../../../utils/requestRoomService";
function Properties() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState();
  const [keyword, setKeyword] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        let res;
        if (keyword) {
          res = await getPropertiesByKeyword(keyword, pageNo, pageSize);
        } else {
          res = await getAllProperties(pageNo, pageSize);
        }
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

  let timeout = null;

  const handleChangeInput = (e) => {
    const keyword = e.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setKeyword(keyword);
    }, 1000);
  };
  return (
    <>
      <div className="" style={{ marginBottom: "20px",position:"relative" }}>
        <Input
          onChange={handleChangeInput}
          style={{ width: "50%", marginRight: "20px" }}
        />
        <SearchOutlined style={{position:"absolute",right:"50%",fontSize:"18px",top:"20%"}}/>
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
