import { Input, Select, Table, DatePicker, Tag, Button } from "antd";
import { useEffect, useMemo, useState } from "react";
import { getAllProperties } from "../../../service/RoomService/PropertyService";
import {
  getAllRefundBills,
  getSearchRefundBills,
} from "../../../service/BookingService/RefundBillService";
import {
  SearchOutlined,
  PrinterOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  formatLocalDateTime,
  getDate,
  getFormatPrice,
} from "../../../utils/format";
import { Link } from "react-router-dom";
import {
  getPrintBill,
  getPrintRefundBill,
} from "../../../service/BookingService/PrintService";
import { exportRefundBills } from "../../../service/BookingService/ExportService";
const { RangePicker } = DatePicker;

function RefundBills() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [propertyId, setPropertyId] = useState(0);
  const [timeOption, setTimeOption] = useState(0);
  const [sortOption, setSortOption] = useState(0);
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dataProperties, setDataProperties] = useState([]);
  const [transactionType, setTransactionType] = useState(0);
  const transactionOptions = [
    { label: "Loại hoàn tiền", value: 0 },
    { label: "Hoàn tiền một phần", value: "03" },
    { label: "Hoàn tiền toàn phần", value: "02" },
  ];
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
    { label: "Tổng hoàn tiền tăng dần", value: "price_asc" },
    { label: "Tổng hoàn tiền giảm dần", value: "price_desc" },
    { label: "Ngày thanh toán tăng dần", value: "date_asc" },
    { label: "Ngày thanh toán giảm dần", value: "date_desc" },
    { label: "Sắp xếp", value: 0 },
  ];
  const filter = useMemo(
    () => ({
      pageNo: pageNo,
      pageSize: pageSize,
      propertyId: propertyId,
      timeOption: timeOption,
      sortOption: sortOption,
      transactionType: transactionType,
      beginDate: timeOption != "custom" ? null : beginDate,
      endDate: timeOption != "custom" ? null : endDate,
    }),
    [
      pageNo,
      pageSize,
      propertyId,
      timeOption,
      sortOption,
      beginDate,
      endDate,
      transactionType,
    ]
  );
  const fetchBills = async () => {
    try {
      console.log(filter);
      const res = await getAllRefundBills(filter);
      console.log("refundBills data:", res);
      if (res.code == 200) {
        setTotal(res.data.total);
        setData(res.data.dataPage);
      }
    } catch (error) {
      console.error("Error fetching refundBills:", error);
    }
  };
  useEffect(() => {
    fetchBills();
    const fetchApi = async () => {
      try {
        const resProperties = await getAllProperties();
        if (resProperties.code == 200) {
          const properties = resProperties.data.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          properties.push({ label: "Khách sạn", value: 0 });
          console.log("Properties:", properties);
          setDataProperties(properties);
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
      const res = await getSearchRefundBills(keyword, pageNo, pageSize);
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
      const blob = await getPrintRefundBill(id);
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
  const handleExport = async () => {
    try {
      const blob = await exportRefundBills();
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "refund-bills.xls";
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
      title: "Mã hóa đơn",
      key: "vnpTxnRef",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.vnp_TxnRef}</b>
          </p>
        </>
      ),
    },
    {
      title: "Email thanh toán",
      key: "vnpTxnRef",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.email}</b>
          </p>
        </>
      ),
    },
    {
      title: "Mã giao dịch",
      key: "vnpTxnRef",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.vnp_TransactionNo}</b>
          </p>
        </>
      ),
    },
    {
      title: "Loại hoàn tiền",
      key: "transactionType",
      render: (_, record) => (
        <>
          {record.vnp_TransactionType === "02" ? (
            <Tag color="green">Hoàn tiền toàn phần</Tag>
          ) : (
            <Tag color="red">Hoàn tiền một phần</Tag>
          )}
        </>
      ),
    },
    {
      title: "Tổng số tiền đã thanh toán",
      key: "vnpAmount",
      render: (_, record) => (
        <>
          <p style={{ color: "red" }}>
            <b>{getFormatPrice(record.originPayment)}</b>
          </p>
        </>
      ),
    },
    {
      title: "Tổng số tiền hoàn",
      key: "vnpAmount",
      render: (_, record) => (
        <>
          <p style={{ color: "red" }}>
            <b>{record.vnp_Amount}</b>
          </p>
        </>
      ),
    },
    {
      title: "Ngày hoàn trả",
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
      key: "payment",
      render: (_, record) => (
        <div style={{ display: "flex" }}>
          <Button style={{ marginRight: "10px" }}>
            <Link to={`/admin/refund-bills/${record.id}`}>
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
          value={transactionType}
          style={{ width: 240, marginRight: "20px", marginTop: "20px" }}
          options={transactionOptions}
          onChange={(value) => {
            setTransactionType(value);
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
export default RefundBills;
