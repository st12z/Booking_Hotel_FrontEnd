import { useEffect, useMemo, useState } from "react";
import {
  getAllProperties,
  getPropertiesByKeyword,
} from "../../../service/RoomService/PropertyService";
import { Button, Input, Rate, Select, Table } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { get } from "../../../utils/requestRoomService";
import { getFormatPrice } from "../../../utils/format";
import { exportPropertiesRevenue } from "../../../service/RoomService/ExportFileService";
function Properties() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState();
  const [keyword, setKeyword] = useState("");
  const [rateStar, setRateStar] = useState(0);
  const [topBill, setTopBill] = useState(0);
  const [topRevenue, setTopRevenue] = useState(0);
  const [propertyType, setPropertyType] = useState("");

  const filter = useMemo(
    () => ({
      rateStar: rateStar,
      keyword: keyword,
      topBill: topBill,
      topRevenue: topRevenue,
      propertyType: propertyType,
      pageNo: pageNo,
      pageSize: pageSize,
    }),
    [keyword, rateStar, topBill, topRevenue, propertyType, pageNo, pageSize]
  );
  const fetchApi = async () => {
    try {
      console.log(filter);
      const res = await getPropertiesByKeyword(filter);
      console.log(res);
      if (res.code == 200) {
        setTotal(res.data.total);
        setData(res.data.dataPage);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, [filter]);
  const columns = [
    {
      title: "Mã khách sạn",
      key: "id",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8", fontWeight: 600 }}>
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
            <b style={{ color: "#0057B8", fontWeight: 600 }}>{record.name}</b>
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
          <p style={{ color: "#0057B8", fontWeight: 600 }}>{record.address}</p>
        </>
      ),
      width: 200,
    },
    {
      title: "Loại",
      key: "propertyType",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8", fontWeight: 600 }}>
            {record.propertyType}
          </p>
        </>
      ),
    },
    {
      title: "Xếp hạng",
      key: "propertyType",
      render: (_, record) => (
        <>
          <p style={{ color: "red", fontWeight: 600 }}>
            <Rate value={record.ratingStar} disabled={true} />
          </p>
        </>
      ),
    },
    {
      title: "Hoá đơn",
      key: "total-bills",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8", fontWeight: 600 }}>
            {record.totalBills}
          </p>
        </>
      ),
    },
    {
      title: "Tổng thu",
      key: "total-payments",
      render: (_, record) => (
        <>
          <p style={{ color: "red", fontWeight: 600 }}>
            {getFormatPrice(record.totalPayments)}
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
            <Link to={`/admin/properties/${record.id}`}>{<EyeOutlined />}</Link>
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
  const handleChangeTopBill = (e) => {
    setTopBill(e);
    setTopRevenue(0);
  };
  // Xử lý top payments
  const handleChangeTopRevenue = (e) => {
    setTopRevenue(e);
    setTopBill(0);
  };
  // Xử lý loại khách sạn
  const handleChangePropertyType = (e) => {
    setPropertyType(e);
  };

  const handleExport = async () => {
    try {
      const blob = await exportPropertiesRevenue();
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "properties_revenue.xls";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };
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
      <div style={{ marginBottom: "20px" }}>
        <Select
          value={rateStar}
          style={{ width: 120, marginRight: "20px" }}
          onChange={handleChangeRateStar}
          options={[
            { value: 0, label: "Đánh giá" },
            { value: 1, label: "1 sao" },
            { value: 2, label: "2 sao" },
            { value: 3, label: "3 sao" },
            { value: 4, label: "4 sao" },
            { value: 5, label: "5 sao" },
          ]}
        />
        <Select
          value={topBill}
          style={{ width: 240, marginRight: "20px" }}
          onChange={handleChangeTopBill}
          options={[
            { value: 0, label: "Top khách sạn theo hóa đơn" },
            { value: 5, label: "Top 5 khách sạn theo hóa đơn" },
            { value: 10, label: "Top 10 khách sạn theo hóa đơn" },
            { value: 30, label: "Top 30 khách sạn theo hóa đơn" },
            { value: 50, label: "Top 50 khách sạn theo hóa đơn" },
          ]}
        />
        <Select
          value={topRevenue}
          style={{ width: 240, marginRight: "20px" }}
          onChange={handleChangeTopRevenue}
          options={[
            { value: 0, label: "Top khách sạn theo tiền thu" },
            { value: 5, label: "Top 5 khách sạn theo tiền thu" },
            { value: 10, label: "Top 10 khách sạn theo tiền thu" },
            { value: 30, label: "Top 30 khách sạn theo tiền thu" },
            { value: 50, label: "Top 50 khách sạn theo tiền thu" },
          ]}
        />
        <Select
          value={propertyType}
          style={{ width: 180, marginRight: "20px" }}
          onChange={handleChangePropertyType}
          options={[
            { value: "", label: "Loại khách sạn" },
            { value: "Hotel", label: "Hotel" },
            { value: "Apartment", label: "Apartment" },
            { value: "Villa", label: "Villa" },
            { value: "Resort", label: "Resort" },
            { value: "Homestay", label: "Homestay" },
          ]}
        />
        <Button color="cyan" variant="outlined" onClick={handleExport}>
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
