import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Input,
  Select,
  Table,
  Tag,
  DatePicker,
  Checkbox,
  notification,
} from "antd";
import {
  getAllSuspiciousTransByFilter,
  getAllSuspiciousTransType,
  getAllTransactionTypes,
  getPaymentTransactionLocked,
  getSuspiciousTransByKeyword,
  getUnclockedUserIdsTrans,
} from "../../../service/PaymentService/payment";
import { getDate, getFormatPrice } from "../../../utils/format";
import {
  EyeOutlined,
  SearchOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { exportPaymentTranLogs } from "../../../service/ExportService/ExportService";
const { RangePicker } = DatePicker;
function PaymentLogs() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [timeOption, setTimeOption] = useState(0);
  const [sortOption, setSortOption] = useState(0);
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [allSuspiciousTransType, setAllSuspiciousTransType] = useState([]);
  const [suspiciousTranType, setSuspiciousTranType] = useState(0);
  const [checkLock, setCheckLock] = useState();
  const [userIds, setUserIds] = useState([]);
  const [isButtonUnclock, setIsButtonUnclock] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, message, color) => {
    api.info({
      message: `Thông báo`,
      description: (
        <span style={{ color: color, fontSize: "20px", fontWeight: 600 }}>
          {message}
        </span>
      ),
      placement,
    });
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resSuspiciousTransType = await getAllSuspiciousTransType();
        console.log(resSuspiciousTransType);
        if (resSuspiciousTransType.code == 200) {
          const data = resSuspiciousTransType.data.map((item) => {
            if (item == "AMOUNT") {
              return {
                label: "Vượt quá số tiền trung bình",
                value: item,
              };
            } else if (item == "FREQUENCY") {
              return {
                label: "Thanh toán thất bại 3 lần liên tiếp",
                value: item,
              };
            } else {
              return {
                label: "Khác",
                value: item,
              };
            }
          });
          data.unshift({ label: "Loại log", value: 0 });
          setAllSuspiciousTransType(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  const timeOptions = [
    { label: "Thời gian log", value: 0 },
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
  const filter = useMemo(
    () => ({
      pageNo: pageNo,
      pageSize: pageSize,
      timeOption: timeOption,
      sortOption: sortOption,
      suspiciousTranType: suspiciousTranType,
      beginDate: timeOption != "custom" ? null : beginDate,
      endDate: timeOption != "custom" ? null : endDate,
    }),
    [
      pageNo,
      pageSize,
      suspiciousTranType,
      timeOption,
      sortOption,
      beginDate,
      endDate,
    ]
  );
  const fetchSuspiciousTrans = async (filter) => {
    try {
      console.log(filter);
      const res = await getAllSuspiciousTransByFilter(filter);
      console.log("suspicious-trans", res.data);
      if (res.code == 200) {
        setTotal(res.data.total);
        setData(res.data.dataPage);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSuspiciousTrans(filter);
    setCheckLock(false);
  }, [filter]);
  const handleChangeInput = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearch = async () => {
    setCheckLock(false);
    try {
      const res = await getSuspiciousTransByKeyword(keyword, pageNo, pageSize);
      console.log(res);
      if (res.code == 200) {
        setData(res.data.dataPage);
        setTotal(res.data.total);
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
  const handleExport = async () => {
    try {
      const blob = await exportPaymentTranLogs();
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = "payment-transactions-log.xls";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCheckLock = async (e) => {
    const checked = e.target.checked;
    setCheckLock(checked);
    try {
      if (checked) {
        const res = await getPaymentTransactionLocked(
          keyword,
          pageNo,
          pageSize
        );
        if (res.code == 200) {
          setTotal(res.data.total);
          setData(res.data.dataPage);
        }
      } else {
        fetchSuspiciousTrans(filter);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddUserIdToArrLocked = (e, userId) => {
    const checked = e.target.checked;
    if (checked) {
      setIsButtonUnclock(false);
      setUserIds((preUserIds) => [...preUserIds, userId]);
      console.log("userIds", userIds);
    } else {
      const newArrLocked = userIds.filter((id) => id != userId);
      if (newArrLocked.length == 0) {
        setIsButtonUnclock(true);
      }
      console.log("newArrLocked", newArrLocked);
      setUserIds(newArrLocked);
    }
  };
  const handleUnclock = async () => {
    try {
      const res = await getUnclockedUserIdsTrans(userIds);
      console.log(res);
      if (res.code === 200) {
        openNotification(
          "topRight",
          `Đã mở khóa user ID: ${userIds.join(", ")} thành công!`,
          "green"
        );
      } else {
        openNotification(
          "topRight",
          `Đã mở khóa user ID: ${userIds.join(", ")} thất bại!`,
          "red"
        );
      }
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
      title: "Mã người giao dịch",
      key: "code",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.userId}</b>
          </p>
        </>
      ),
    },
    {
      title: "Mã hóa đơn",
      key: "bill_code",
      render: (_, record) => (
        <>
          {record.billCode ? (
            <p style={{ color: "#0057B8" }}>
              <b>{record.billCode}</b>
            </p>
          ) : (
            <p style={{ color: "#0057B8" }}>
              <b>null</b>
            </p>
          )}
        </>
      ),
    },
    {
      title: "IP người giao dịch",
      key: "ip_address",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.ipAddress}</b>
          </p>
        </>
      ),
    },
    {
      title: "Loại log",
      key: "suspiciousType",
      render: (_, record) => (
        <>
          <p>
            {record.suspiciousType == "AMOUNT" ? (
              <Tag color="green">{record.suspiciousReason}</Tag>
            ) : (
              <Tag color="red">{record.suspiciousReason}</Tag>
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
          <p style={{ color: "red" }}>
            <b>{getFormatPrice(record.amount)}</b>
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
    {
      title: "Hành động",
      key: "amount",
      render: (_, record) => (
        <>
          {checkLock && record.suspiciousType === "FREQUENCY" && (
            <Checkbox
              name="lockedId"
              onChange={(e) => handleAddUserIdToArrLocked(e, record.userId)}
            />
          )}
        </>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <h2>Danh sách log giao dịch</h2>
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
          value={suspiciousTranType}
          style={{ width: 280, marginRight: "20px" }}
          options={allSuspiciousTransType}
          onChange={(value) => {
            setSuspiciousTranType(value);
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
      <div className="suspicious_log_locked" style={{ marginBottom: "20px" }}>
        <Checkbox
          name="lock"
          checked={checkLock}
          onChange={handleCheckLock}
          style={{ marginRight: "20px" }}
        >
          Giao dịch đang bị khóa
        </Checkbox>
        <Button
          onClick={handleUnclock}
          type="primary"
          disabled={isButtonUnclock}
        >
          Mở khóa
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
export default PaymentLogs;
