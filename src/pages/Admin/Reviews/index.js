import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  PrinterOutlined,
  DeleteOutlined,
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
const { RangePicker } = DatePicker;
function Reviews() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [propertyId, setPropertyId] = useState(0);
  const [dataProperties, setDataProperties] = useState([]);
  const [timeOption, setTimeOption] = useState(0);
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [shouldResetPageNo, setShouldResetPageNo] = useState();
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [sortOption, setSortOption] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const [isReload,setIsReload] = useState(false);
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
    { label: "Ngày đánh giá tăng dần", value: "date_asc" },
    { label: "Ngày đánh giá giảm dần", value: "date_desc" },
  ];
  const filter = useMemo(
    () => ({
      pageNo: pageNo,
      pageSize: pageSize,
      propertyId: propertyId,
      timeOption: timeOption,
      sortOption: sortOption,
      beginDate: timeOption != "custom" ? null : beginDate,
      endDate: timeOption != "custom" ? null : endDate,
    }),
    [pageNo, pageSize, propertyId, timeOption, sortOption, beginDate, endDate]
  );
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resProperties = await getAllProperties();
        if (resProperties.code == 200) {
          const properties = resProperties.data.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          properties.unshift({ label: "Khách sạn", value: 0 });
          console.log("Properties:", properties);
          setDataProperties(properties);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);

  // fetchReviews
  const fetchReviews = async () => {
    try {
      const res = await getAllReviews(filter);
      console.log(res);
      setIsSearchMode(false);
      setKeyword("");
      console.log("------------Gọi API filter---------");
      console.log("filter", filter);
      console.log("Reviews data:", res);
      if (res.code == 200) {
        setTotal(res.data.total);
        setData(res.data.dataPage);
      }
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };
  useEffect(() => {
    if ((pageNo === 1) & !isSearchMode) {
      fetchReviews();
    } else {
      setPageNo(1);
    }
  }, [propertyId, timeOption, sortOption, beginDate, endDate]);

  useEffect(() => {
    if (!isSearchMode) {
      fetchReviews();
    }
  }, [pageNo]);
  //fetchReviews

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
      const res = await getSearchReviews(keyword, pageNo, pageSize);
      if (res.code == 200) {
        setTotal(res.data.total);
        setData(res.data.dataPage);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };
  useEffect(() => {
    if (isSearchMode & triggerSearch) {
      getApiSearch();
      setTriggerSearch(false);
    }
  }, [pageNo]);

  // end search

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
  const handleDeleteReview = async (id) => {
    try {
      const res = await deleteReview(id);
      console.log(res);
      if (res.code == 200) {
        setIsReload(isReload=>!isReload);
        openNotification("topRight", "Xóa thành công", "green");
      } else {
        openNotification("topRight", "Xóa thất bại", "red");
      }
    } catch (error) {
      openNotification("topRight", "Xóa thất bại", "red");

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
      title: "Mã người dùng",
      key: "user_id",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.userId}</b>
          </p>
        </>
      ),
    },
    {
      title: "Nội dung",
      key: "content",
      render: (_, record) => (
        <>
          <div className="" style={{ display: "flex", gap: "20px" }}>
            {Array.isArray(record.images) &&
              record.images.length > 0 &&
              record.images.map((item, index) => (
                <img src={item} style={{ width: "100px", height: "80px" }} />
              ))}
          </div>
          <p style={{ color: "#0057B8" }}>
            <b>{record.content}</b>
          </p>
        </>
      ),
    },
    {
      title: "Mã khách sạn",
      key: "property_id",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.propertyId}</b>
          </p>
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
        <>
          <Popconfirm
            title="Xóa đánh giá"
            description="Bạn có muốn xoá đánh giá?"
            onConfirm={() => handleDeleteReview(record.id)}
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      {contextHolder};
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
export default Reviews;
