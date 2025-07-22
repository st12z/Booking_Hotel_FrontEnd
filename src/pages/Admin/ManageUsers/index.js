import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  PrinterOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Select,
  Table,
  DatePicker,
  Tag,
  notification,
  Checkbox,
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
  getAllUsers,
  getSearchUsers,
  resetPassword,
} from "../../../service/UserService/AuthService";
import {
  getAllRoles,
  getAllRolesAdmin,
  getAllRolesByPage,
} from "../../../service/UserService/RoleService";
const { RangePicker } = DatePicker;
function ManageUsers() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [timeOption, setTimeOption] = useState(0);
  const [dataRoleTypes, setDataRoleTypes] = useState([]);
  const [roleId, setRoleId] = useState(0);
  const [sortOption, setSortOption] = useState(0);
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const isMounted = useRef(false);
  const [api, contextHolder] = notification.useNotification();
  const [rolesAdmin, setRolesAdmin] = useState([]);
  const [checked, setChecked] = useState(false);
  const openNotification = (placement, message, color, onClose) => {
    api.info({
      message: `Thông báo`,
      description: (
        <span style={{ color: color, fontSize: "20px", fontWeight: 600 }}>
          {message}
        </span>
      ),
      placement,
      duration: 5,
    });
  };
  const timeOptions = [
    { label: "Thời gian đăng kí", value: 0 },
    { label: "Hôm nay", value: "today" },
    { label: "Hôm qua", value: "yesterday" },
    { label: "7 ngày qua", value: "last_7_days" },
    { label: "30 ngày qua", value: "last_30_days" },
    { label: "Tuần này", value: "this_week" },
    { label: "Tháng này", value: "this_month" },
    { label: "Năm nay", value: "this_year" },
    { label: "Tùy chọn", value: "custom" },
  ];
  const sortOptions = [
    { label: "Sắp xếp", value: 0 },
    { label: "Sắp xếp tên tăng dần", value: "last_name_asc" },
    { label: "Sắp xếp tên giảm dần", value: "last_name_desc" },
    { label: "Ngày đăng kí tăng dần", value: "date_asc" },
    { label: "Ngày đăng kí giảm dần", value: "date_desc" },
  ];
  const filter = useMemo(
    () => ({
      pageNo: pageNo,
      pageSize: pageSize,
      timeOption: timeOption,
      roleId: roleId,
      sortOption: sortOption,
      beginDate: timeOption != "custom" ? null : beginDate,
      endDate: timeOption != "custom" ? null : endDate,
    }),
    [pageNo, pageSize, timeOption, roleId, sortOption, beginDate, endDate]
  );
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resRoles = await getAllRoles();
        console.log("resRoles", resRoles.data);
        const resRolesAdmin = await getAllRolesAdmin();
        console.log("resRolesAdmin", resRolesAdmin);
        if (resRolesAdmin.code == 200) {
          setRolesAdmin(resRolesAdmin.data);
        }
        if (resRoles.code == 200) {
          const roles = resRoles.data.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          roles.unshift({ label: "Vai trò", value: 0 });
          console.log("Roles:", roles);
          setDataRoleTypes(roles);
        }
      } catch (error) {
        console.error("Error fetching rolls status:", error);
      }
    };
    fetchApi();
  }, []);
  // fethBills
  const fetchUsers = async () => {
    try {
      const res = await getAllUsers(filter);
      console.log("------------Gọi API filter---------");
      console.log("filter", filter);
      console.log("Users data:", res);
      if (res.code == 200) {
        setTotal(res.data.total);
        setData(res.data.dataPage);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    setIsSearchMode(false);
    setKeyword("");
    if (pageNo === 1) {
      fetchUsers();
    } else {
      setPageNo(1);
    }
  }, [timeOption, roleId, sortOption, beginDate, endDate]);
  useEffect(() => {
    if (!isSearchMode && isMounted.current) {
      fetchUsers();
    } else {
      isMounted.current = true;
    }
  }, [pageNo]);

  // end fetchUsers

  // search
  const handleChangeInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = async () => {
    setIsSearchMode(true);
    if (pageNo === 1) {
      getApiSearch(); // Gọi API trực tiếp nếu đã ở trang 1
    } else {
      setPageNo(1); // Khi pageNo thay đổi, useEffect sẽ gọi API
    }
  };
  const getApiSearch = async () => {
    try {
      const res = await getSearchUsers(keyword, pageNo, pageSize);
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
  const handleResetPassword = async (id) => {
    try {
      const res = await resetPassword(id);
      console.log(res);
      if (res.code == 200) {
        openNotification(
          "topRight",
          "Đã gửi email đến người dùng thành công!",
          "green"
        );
      } else {
        openNotification("topRight", "Gửi email thất bại!", "red");
      }
    } catch (error) {
      openNotification("topRight", "Gửi email thất bại!", "red");
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
      title: "Họ tên",
      key: "firstName",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.firstName}</b>
          </p>
        </>
      ),
    },
    {
      title: "Tên",
      key: "lastName",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.lastName}</b>
          </p>
        </>
      ),
    },
    {
      title: "Email",
      key: "email",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.email}</b>
          </p>
        </>
      ),
    },
    {
      title: "Avatar",
      key: "avatar",
      render: (_, record) => (
        <>
          <img src={record.avatar} style={{ width: "100px" }} />
        </>
      ),
    },
    {
      title: "Vai trò",
      key: "avatar",
      render: (_, record) => {
        console.log("record", record);
        return (
          <>
            <p style={{ color: "#0057B8" }}>
              <b>
                {(Array.isArray(record?.roles) ? record.roles : []).join(
                  ", "
                ) || "No Roles"}
              </b>
            </p>
            {!(record.roleDtos.length == 1 && record.roleDtos[0].id == 1) &&
              checked == true && (
                <button style={{ marginRight: "10px" }}>
                  <Link to={`/admin/manage-users/edit-roles/${record.id}`}>
                    Chỉnh sửa role
                  </Link>
                </button>
              )}
          </>
        );
      },
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
          <div
            className=""
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Popconfirm
              title="Bạn có muốn reset password?"
              onConfirm={() => handleResetPassword(record.id)}
            >
              <Button type="primary">Reset password</Button>
            </Popconfirm>
          </div>
        </>
      ),
    },
  ];
  const handleChangeCheckbox = (e) => {
    setChecked(e.target.checked);
  };
  return (
    <>
      {contextHolder}
      <h2>Danh sách người dùng</h2>
      <Button
        color="green"
        variant="solid"
        style={{ marginBottom: "20px", marginBottom: "20px" }}
      >
        <Link to="/admin/manage-users/create">
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
        <div
          className="icon_search"
          onClick={(e) => {
            e.stopPropagation();
            handleSearch();
          }}
        >
          <SearchOutlined />
          <span>Tìm kiếm</span>
        </div>
      </div>
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <Select
          value={roleId}
          style={{ width: 160, marginRight: "20px" }}
          options={dataRoleTypes}
          onChange={(value) => {
            setRoleId(value);
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
      <Checkbox
        onChange={handleChangeCheckbox}
        style={{ marginBottom: "20px" }}
        checked={checked}
      >
        Chỉnh sửa roles
      </Checkbox>
      {data && (
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
      )}
    </>
  );
}
export default ManageUsers;
