import { Link } from "react-router-dom";
import {
  getAllBillTypeStatus,
  getSearchBills,
} from "../../service/BookingService/BillService";
import { getAllProperties } from "../../service/RoomService/PropertyService";
import { getDate, getFormatPrice } from "../../utils/format";
import { Button, Input, Select, Table, Tag, DatePicker } from "antd";
import {
  EyeOutlined,
  SearchOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getAllPaymentTransactions,
  getAllTransactionTypes,
  getSearchTransaction,
} from "../../service/PaymentService/payment";
import { exportTransactions } from "../../service/ExportService/ExportService";
function ListPaymentTransaction() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [dataProperties, setDataProperties] = useState([]);
  const [propertyId, setPropertyId] = useState(0);
  const [timeOption, setTimeOption] = useState(0);
  const [dataTransactionTypes, setDataTransactionTypes] = useState([]);
  const [transactionType, setTransactionType] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState(0);
  const [sortOption, setSortOption] = useState(0);
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [shouldResetPageNo, setShouldResetPageNo] = useState();
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const { RangePicker } = DatePicker;
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
    { label: "Sắp xếp", value: 0 },
    { label: "Tổng tiền giao dịch tăng dần", value: "price_asc" },
    { label: "Tổng tiền giao dịch giảm dần", value: "price_desc" },
    { label: "Ngày thanh toán tăng dần", value: "date_asc" },
    { label: "Ngày thanh toán giảm dần", value: "date_desc" },
  ];
  const transactionStatusOptions = [
    { label: "Trạng thái giao dịch", value: 0 },
    { label: "Thành công", value: "SUCCESS" },
    { label: "Thất bại", value: "FAILURE" },
  ];
  const filter = useMemo(
    () => ({
      pageNo: pageNo,
      pageSize: pageSize,
      propertyId: propertyId,
      timeOption: timeOption,
      transactionType: transactionType,
      transactionStatus: transactionStatus,
      sortOption: sortOption,
      beginDate: timeOption != "custom" ? null : beginDate,
      endDate: timeOption != "custom" ? null : endDate,
    }),
    [
      pageNo,
      pageSize,
      propertyId,
      timeOption,
      transactionType,
      transactionStatus,
      sortOption,
      beginDate,
      endDate,
    ]
  );
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resProperties = await getAllProperties();
        const resTransactionTypes = await getAllTransactionTypes();
        if (resProperties.code == 200) {
          const properties = resProperties.data.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          properties.unshift({ label: "Khách sạn", value: 0 });
          console.log("Properties:", properties);
          setDataProperties(properties);
        }
        if (resTransactionTypes.code == 200) {
          const transactionTypes = resTransactionTypes.data.map((item) => ({
            label: item,
            value: item,
          }));
          transactionTypes.unshift({ label: "Loại giao dịch", value: 0 });
          console.log("Transaction Types:", transactionTypes);
          setDataTransactionTypes(transactionTypes);
        }
      } catch (error) {
        console.error(
          "Error fetching properties or transaction status:",
          error
        );
      }
    };
    fetchApi();
  }, []);

  // fetch transactions
  const fetchTransactions = async () => {
    try {
      console.log(filter);
      const res = await getAllPaymentTransactions(filter);
      console.log("TransactionPayments data:", res);
      if (res.code == 200) {
        setTotal(res.data.total);
        setData(res.data.dataPage);
      }
    } catch (error) {
      console.error("Error fetching transaction types:", error);
    }
  };

  useEffect(() => {
    setIsSearchMode(false);
      setKeyword("");
    if ((pageNo === 1)) {
      fetchTransactions();
    } else {
      setPageNo(1);
    }
  }, [
    propertyId,
    timeOption,
    transactionType,
    transactionStatus,
    sortOption,
    beginDate,
    endDate,
  ]);
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isSearchMode && isMounted.current) {
      fetchTransactions();
    }
    else{
      isMounted.current=true;
    }
  }, [pageNo]);
  //end

  //search
  const handleChangeInput = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearch = async () => {
    setIsSearchMode(true);
    if (pageNo === 1) {
      getApiSearch(); // Gọi API trực tiếp nếu đã ở trang 1
    } else {
      setTriggerSearch(true);
      setPageNo(1); // Khi pageNo thay đổi, useEffect sẽ gọi API
    }
  };
  const getApiSearch = async () => {
    try {
      console.log("Searching for keyword:", keyword);
      console.log(pageNo, pageSize);
      const res = await getSearchTransaction(keyword, pageNo, pageSize);
      if (res.code == 200) {
        setTotal(res.data.total);
        setData(res.data.dataPage);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  useEffect(() => {
    if (isSearchMode) {
      getApiSearch();
      setTriggerSearch(false);
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
      key: "code",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.vnpTxnRef}</b>
          </p>
        </>
      ),
    },
    {
      title: "Mã giao dịch",
      key: "transaction_no",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.vnpTransactionNo}</b>
          </p>
        </>
      ),
    },
    {
      title: "Loại thanh toán",
      key: "transaction-type",
      render: (_, record) => (
        <>
          <p>
            {record.transactionType == "REFUND" ? (
              <b style={{ color: "red" }}>Hoàn tiền</b>
            ) : (
              <b style={{ color: "#0057B8" }}>Thanh toán</b>
            )}
          </p>
        </>
      ),
    },
    {
      title: "Trạng thái thanh toán",
      key: "status",
      render: (_, record) => (
        <>
          <p>
            {record.vnpResponseCode == "00" ? (
              <Tag color="green">Thành công</Tag>
            ) : (
              <Tag color="red">Thất bại</Tag>
            )}
          </p>
        </>
      ),
    },
    {
      title: "Tổng tiền giao dịch",
      key: "amount",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{getFormatPrice(record.vnpAmount)}</b>
          </p>
        </>
      ),
    },
    {
      title: "Ngày thanh toán",
      key: "amount",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{getDate(record.createdAt)}</b>
          </p>
        </>
      ),
    },
  ];
  const handleExport = async () => {
    try {
      const blob = await exportTransactions();
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "payment-transactions.xls";
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
      <h2>Danh sách giao dịch</h2>
      <div className="input_search">
        <Input
          value={keyword}
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
          style={{ width: 140, marginRight: "20px" }}
          options={dataTransactionTypes}
          onChange={(value) => {
            setTransactionType(value);
          }}
        />
        <Select
          value={transactionStatus}
          style={{ width: 170, marginRight: "20px" }}
          options={transactionStatusOptions}
          onChange={(value) => {
            setTransactionStatus(value);
          }}
        />
        <Select
          value={sortOption}
          style={{ width: 220, marginRight: "20px", marginTop: "20px" }}
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
export default ListPaymentTransaction;
