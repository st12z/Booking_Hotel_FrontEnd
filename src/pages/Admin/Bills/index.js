import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { Button, Input, Select, Table, DatePicker, Tag } from "antd";
import { use, useEffect, useMemo, useState } from "react";
import "./Bills.scss";
import {
  getAllBills,
  getAllBillTypeStatus,
  getBillByKeyword,
  getSearchBills,
} from "../../../service/BookingService/BillService";
import { getAllProperties } from "../../../service/RoomService/PropertyService";
import { Link } from "react-router-dom";
import {
  formatLocalDateTime,
  getDate,
  getFormatPrice,
} from "../../../utils/format";
import { exportBills } from "../../../service/RoomService/ExportFileService";
import { getPrintBill } from "../../../service/BookingService/PrintService";
const { RangePicker } = DatePicker;
function Bills() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [dataProperties, setDataProperties] = useState([]);
  const [propertyId, setPropertyId] = useState(0);
  const [timeOption, setTimeOption] = useState(0);
  const [dataBillTypeStatus, setDataBillTypeStatus] = useState([]);
  const [billTypeStatus, setBillTypeStatus] = useState(0);
  const [sortOption, setSortOption] = useState(0);
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const timeOptions = [
    { label: "Thời gian thanh toán", value: 0 },
    { label: "Hôm nay", value: "today" },
    { label: "Hôm qua", value: "yesterday" },
    { label: "7 ngày qua", value: "last_7_days" },
    { label: "30 ngày qua", value: "last_30_days" },
    { label: "Tuần này", value: "this_week" },
    { label: "Tháng này", value: "this_month" },
    { label: "Năm nay", value: "this_year" },
    { label: "Tùy chọn", value: "custom" }, // để hiện date range picker
  ];
  const sortOptions = [
    { label: "Tổng tiền tăng dần", value: "price_asc" },
    { label: "Tổng tiền giảm dần", value: "price_desc" },
    { label: "Ngày thanh toán tăng dần", value: "date_asc" },
    { label: "Ngày thanh toán giảm dần", value: "date_desc" },
    { label: "Tất cả", value: 0 },
  ];
  const filter = useMemo(
    () => ({
      pageNo: pageNo,
      pageSize: pageSize,
      propertyId: propertyId,
      timeOption: timeOption,
      billTypeStatus: billTypeStatus,
      sortOption: sortOption,
      beginDate: timeOption != "custom" ? null : beginDate,
      endDate: timeOption != "custom" ? null : endDate,
    }),
    [
      pageNo,
      pageSize,
      propertyId,
      timeOption,
      billTypeStatus,
      sortOption,
      beginDate,
      endDate,
    ]
  );
  const fetchBills = async () => {
    try {
      console.log(filter);
      const res = await getAllBills(filter);
      console.log("Bills data:", res);
      if (res.code == 200) {
        setTotal(res.data.total);
        setData(res.data.dataPage);
      }
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resProperties = await getAllProperties();
        const resBillTypeStatus = await getAllBillTypeStatus();
        if (resProperties.code == 200) {
          const properties = resProperties.data.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          properties.push({ label: "Khách sạn", value: 0 });
          console.log("Properties:", properties);
          setDataProperties(properties);
        }
        if (resBillTypeStatus.code == 200) {
          const billTypes = resBillTypeStatus.data.map((item) => ({
            label: item,
            value: item,
          }));
          billTypes.push({ label: "Trạng thái hóa đơn", value: 0 });
          console.log("Bill Types:", billTypes);
          setDataBillTypeStatus(billTypes);
        }
      } catch (error) {
        console.error("Error fetching properties or bill status:", error);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    fetchBills();
  }, [filter]);
  const handleChangeInput = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearch = async () => {
    try {
      console.log("Searching for keyword:", keyword);
      const res = await getSearchBills(keyword, pageNo, pageSize);
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
  const handleChangRangePicker = (dates, dateStrings) => {
    console.log("Selected dates:", dates, dateStrings);
    if (dates) {
      setBeginDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
    } else {
      setBeginDate(null);
      setEndDate(null);
    }
  };
  const handlePrintBills = async (id) => {
    try {
      const blob = await getPrintBill(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.log(error);
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
      title: "Mã hóa đơn",
      key: "billCode",
      render: (_, record) => (
        <>
          <p>
            <b>{record.billCode}</b>
          </p>
        </>
      ),
    },
    {
      title: "Email khách hàng",
      key: "email",
      render: (_, record) => (
        <>
          <p>
            <b>{record.email}</b>
          </p>
        </>
      ),
      width: 150,
    },
    {
      title: "Họ tên khách hàng",
      key: "fullName",
      render: (_, record) => (
        <>
          <p>
            <b>
              {record.firstName} {record.lastName}
            </b>
          </p>
        </>
      ),
      width: 160,
    },
    {
      title: "Số điện thoại",
      key: "phoneNumber",
      render: (_, record) => (
        <>
          <p>
            <b>{record.phoneNumber}</b>
          </p>
        </>
      ),
    },
    {
      title: "Trạng thái thanh toán",
      key: "statusBill",
      render: (_, record) => (
        <>
          <p>
            {record.billStatus == "SUCCESS" ? (
              <Tag color="green">Đã thanh toán</Tag>
            ) : record.billStatus == "CANCEL" ? (
              <Tag color="blue">Đã huỷ đặt phòng</Tag>
            ) : (
              <Tag color="red">Chưa thanh toán</Tag>
            )}
          </p>
        </>
      ),
    },
    {
      title: "Tổng tiền thanh toán",
      key: "totalAmount",
      render: (_, record) => (
        <>
          <p style={{ color: "red" }}>
            <b>{getFormatPrice(record.newTotalPayment)}</b>
          </p>
        </>
      ),
    },
    {
      title: "Ngày thanh toán",
      key: "createdAt",
      render: (_, record) => (
        <>
          <p>
            <b>{getDate(record.createdAt)}</b>
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
            <Link to={`/admin/bills/${record.billCode}`}>
              {<EyeOutlined />}
            </Link>
          </Button>
          <Button onClick={() => handlePrintBills(record.id)}>
            <PrinterOutlined />
          </Button>
        </div>
      ),
    },
  ];
  const handleExport = async () => {
    try {
      const blob = await exportBills();
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bills.xls";
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
      <div className="input_search">
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
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <Select
          value={propertyId}
          style={{ width: 240, marginRight: "20px" }}
          options={dataProperties}
          onChange={(value) => {
            setPropertyId(value);
          }}
        />
        <Select
          value={timeOption}
          style={{ width: 180, marginRight: "20px" }}
          options={timeOptions}
          onChange={(value) => {
            setTimeOption(value);
          }}
        />
        {timeOption === "custom" && (
          <RangePicker
            style={{ marginRight: "20px" }}
            onChange={handleChangRangePicker}
          />
        )}
        <Select
          value={billTypeStatus}
          style={{ width: 160, marginRight: "20px" }}
          options={dataBillTypeStatus}
          onChange={(value) => {
            setBillTypeStatus(value);
          }}
        />
        <Select
          value={sortOption}
          style={{ width: 240, marginRight: "20px", marginTop: "20px" }}
          options={sortOptions}
          onChange={(value) => {
            setSortOption(value);
          }}
        />
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
export default Bills;
