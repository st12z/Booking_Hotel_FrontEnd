import { Button, DatePicker, Input, Select, Table, Tag } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  SearchOutlined,
  PrinterOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  getAllDiscountsByPage,
  getAllDiscountType,
  getSearchDiscounts,
} from "../../../service/RoomService/DiscountService";
import { getDate, getFormatPrice } from "../../../utils/format";
import { Link } from "react-router-dom";
const { RangePicker } = DatePicker;

function DiscountHotels() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [discountStatus, setDiscountStatus] = useState(0);
  const [sortOption, setSortOption] = useState(0);
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [shouldResetPageNo, setShouldResetPageNo] = useState();
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [timeOption, setTimeOption] = useState(0);
  const [discountType, setDiscountType] = useState(0);
  const [dataDiscountType, setDataDiscountType] = useState([]);
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
    { label: "Số lượng hiện có tăng dần", value: "quantity_asc" },
    { label: "Số lượng hiện có giảm dần", value: "quantity_desc" },
    { label: "Ngày tạo tăng dần", value: "date_asc" },
    { label: "Ngày tạo giảm dần", value: "date_desc" },
  ];
  const dataDiscountStatus = [
    { label: "Trạng thái", value: 0 },
    { label: "Còn", value: "active" },
    { label: "Hết", value: "expired" },
  ];
  const filter = useMemo(
    () => ({
      pageNo: pageNo,
      pageSize: pageSize,
      timeOption: timeOption,
      discountStatus: discountStatus,
      discountType: discountType,
      sortOption: sortOption,
      beginDate: timeOption != "custom" ? null : beginDate,
      endDate: timeOption != "custom" ? null : endDate,
    }),
    [
      pageNo,
      pageSize,
      timeOption,
      discountStatus,
      discountType,
      sortOption,
      beginDate,
      endDate,
    ]
  );
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resDiscountType = await getAllDiscountType();
        if (resDiscountType.code == 200) {
          const discountTypes = resDiscountType.data.map((item) => ({
            label: item,
            value: item,
          }));
          discountTypes.push({ label: "Loại phiếu giảm giá", value: 0 });
          setDataDiscountType(discountTypes);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchApi();
  }, []);

  //fetchDiscounts
  const fetchDiscounts = async () => {
    try {
      const res = await getAllDiscountsByPage(filter);

      console.log("------------Gọi API filter---------");
      console.log("filter", filter);
      console.log("discount data:", res);
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
      fetchDiscounts();
    } else {
      setPageNo(1);
    }
  }, [
    timeOption,
    discountStatus,
    discountType,
    sortOption,
    beginDate,
    endDate,
  ]);
const isMounted = useRef(false);
  useEffect(() => {
    if (!isSearchMode && isMounted.current) {
      fetchDiscounts();
    }
    else{
      isMounted.current=true;
    }
  }, [pageNo]);

  // end fetchDiscounts

  // search
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
      const res = await getSearchDiscounts(keyword, pageNo, pageSize);
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

  //
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
      title: "Mã Code",
      key: "id",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.code}</b>
          </p>
        </>
      ),
    },
    {
      title: "Ảnh",
      key: "image",
      render: (_, record) => (
        <>
          <img src={record.image} style={{ width: "150px", height: "100px" }} />
        </>
      ),
    },
    {
      title: "Loại",
      key: "discount-type",
      render: (_, record) => (
        <>
          {record.discountType == "PERCENT" ? (
            <Tag color="blue">{record.discountType}</Tag>
          ) : (
            <Tag color="red">{record.discountType}</Tag>
          )}
        </>
      ),
    },
    {
      title: "Giảm giá",
      key: "discount-value",
      render: (_, record) => (
        <>
          {record.discountType == "PERCENT" ? (
            <Tag color="blue">{record.discountValue} %</Tag>
          ) : (
            <Tag color="red">{getFormatPrice(record.discountValue)}</Tag>
          )}
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
      title: "Bắt đầu",
      key: "start_date",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{getDate(record.startDate)}</b>
          </p>
        </>
      ),
    },
    {
      title: "Kết thúc",
      key: "end_date",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{getDate(record.endDate)}</b>
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
        <Button style={{ marginRight: "10px" }}>
          <Link to={`/admin/discount-hotels/edit/${record.id}`}>
            {<EditOutlined />}
          </Link>
        </Button>
      ),
    },
  ];
  return (
    <>
      <Button color="green" variant="solid" style={{ marginBottom: "20px" }}>
        <Link to="/admin/discount-hotels/create">
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
          value={discountStatus}
          style={{ width: 160, marginRight: "20px" }}
          options={dataDiscountStatus}
          onChange={(value) => {
            setDiscountStatus(value);
          }}
        />
        <Select
          value={discountType}
          style={{ width: 180, marginRight: "20px" }}
          options={dataDiscountType}
          onChange={(value) => {
            setDiscountType(value);
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
export default DiscountHotels;
