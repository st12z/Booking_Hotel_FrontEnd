import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  PrinterOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from "@ant-design/icons";
import {
  Button,
  Input,
  Select,
  Table,
  DatePicker,
  Tag,
  notification,
  Popconfirm,
} from "antd";
import { use, useEffect, useMemo, useRef, useState } from "react";
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
import { getPrintBill } from "../../../service/BookingService/PrintService";
import { exportBills } from "../../../service/ExportService/ExportService";
import {
  deleteReview,
  getAllReviews,
  getSearchReviews,
} from "../../../service/RoomService/ReviewService";
import {
  getAllCarStatus,
  getAllCarTypes,
  getAllVehiclesByFilter,
  getSearchVehicles,
} from "../../../service/BookingService/VehicleService";
const { RangePicker } = DatePicker;
function Vehicles() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [timeOption, setTimeOption] = useState(0);
  const [carType, setCarType] = useState(0);
  const [dataCarTypes, setDataCarTypes] = useState([]);
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dataCarStatus, setDataCarStatus] = useState([]);
  const [carStatus, setCarStatus] = useState(0);
  const [shouldResetPageNo, setShouldResetPageNo] = useState();
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [sortOption, setSortOption] = useState(0);
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
  const timeOptions = [
    { label: "Thời gian tạo", value: 0 },
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
    { label: "Giá tăng dần", value: "price_asc" },
    { label: "Giá giảm dần", value: "price_desc" },
    { label: "Ngày đánh giá tăng dần", value: "date_asc" },
    { label: "Ngày đánh giá giảm dần", value: "date_desc" },
  ];
  const filter = useMemo(
    () => ({
      pageNo: pageNo,
      pageSize: pageSize,
      carType: carType,
      timeOption: timeOption,
      sortOption: sortOption,
      beginDate: timeOption != "custom" ? null : beginDate,
      endDate: timeOption != "custom" ? null : endDate,
      carStatus: carStatus
    }),
    [pageNo, pageSize, carType, timeOption, sortOption, beginDate, endDate,carStatus]
  );
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resDataCarStatus = await getAllCarStatus();
        if (resDataCarStatus.code == 200) {
          const carStatus = Object.entries(resDataCarStatus.data).map(
            ([label, value]) => ({
              label,
              value,
            })
          );
          carStatus.unshift({ label: "Trạng thái", value: 0 });
          console.log("CarStatus:", carStatus);
          setDataCarStatus(carStatus);
        }
        const resCarTypes = await getAllCarTypes();
        console.log("resCarTypes", resCarTypes);
        if (resCarTypes.code == 200) {
          const carTypes = Object.entries(resCarTypes.data).map(
            ([label, value]) => ({
              label,
              value,
            })
          );
          carTypes.unshift({ label: "Loại xe", value: 0 });
          console.log("CarTypes:", carTypes);
          setDataCarTypes(carTypes);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);

  // fetchVehicles
  const fetchVehicles = async () => {
    try {
      const res = await getAllVehiclesByFilter(filter);
      console.log(res);

      console.log("------------Gọi API filter---------");
      console.log("filter", filter);
      console.log("vehicles data:", res);
      if (res.code == 200) {
        setTotal(res.data.total);
        setData(res.data.dataPage);
      }
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };
  useEffect(() => {
    setIsSearchMode(false);
    setKeyword("");
    if (pageNo === 1) {
      fetchVehicles();
    } else {
      setPageNo(1);
    }
  }, [carType, timeOption, sortOption, beginDate, endDate,carStatus]);
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isSearchMode && isMounted.current) {
      fetchVehicles();
    }
    else{
      isMounted.current=true;
    }
  }, [pageNo]);
  // end
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
      const res = await getSearchVehicles(keyword, pageNo, pageSize);
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
    }
  }, [pageNo]);
  //end search
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
      title: "Biển số",
      key: "license_place",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.licensePlate}</b>
          </p>
        </>
      ),
    },
    {
      title: "Ảnh",
      key: "images",
      render: (_, record) => (
        <>
          <img src={record.images} style={{ width: "150px" }} />
        </>
      ),
    },
    {
      title: "Giảm giá",
      key: "discount",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.discount}%</b>
          </p>
        </>
      ),
    },
    {
      title: "Số lượng",
      key: "quantity",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.quantity}</b>
          </p>
        </>
      ),
    },
    {
      title: "Giá",
      key: "price",
      render: (_, record) => (
        <>
          <p style={{ color: "red" }}>
            <b>{getFormatPrice(record.price)}</b>
          </p>
        </>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => (
        <>
          {record.status == "AVAILABLE" ? (
            <Tag color="green">Có sẵn</Tag>
          ) : record.status == "BUSY" ? (
            <Tag color="blue">Đang bận</Tag>
          ) : (
            <Tag color="red">Không hoạt động</Tag>
          )}
        </>
      ),
    },
    {
      title: "Ngày tạo",
      key: "created_at",
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
          <Link to={`/admin/vehicles/edit/${record.id}`}>
            {<EditOutlined />}
          </Link>
        </Button>
      ),
    },
  ];
  return (
    <>
      {contextHolder};
      <Button color="green" variant="solid" style={{ marginBottom: "20px" }}>
        <Link to="/admin/vehicles/create">
          <PlusOutlined />
          Tạo mới
        </Link>
      </Button>
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
      </div>
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <Select
          value={carStatus}
          style={{ width: 240, marginRight: "20px" }}
          options={dataCarStatus}
          onChange={(value) => {
            setCarStatus(value);
          }}
        />
        <Select
          value={carType}
          style={{ width: 240, marginRight: "20px" }}
          options={dataCarTypes}
          onChange={(value) => {
            setCarType(value);
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
export default Vehicles;
