import { useEffect, useState } from "react";
import {
  getAllRoomChats,
  updateRoomChats,
} from "../../../service/RoomService/RoomChatsService";
import { getAllUsersAdmin } from "../../../service/UserService/AuthService";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, notification, Select, Table } from "antd";
function ManageRoomChats() {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [dataUsers, setDataUsers] = useState([]);
  const [checked, setChecked] = useState(false);
  const [updateRooms, setUpdateRooms] = useState([]);
  const [reload, setReload] = useState(false);
  const [api, contextHolder] = notification.useNotification();
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
  const fetchRoomChats = async () => {
    try {
      const res = await getAllRoomChats(keyword, pageNo, pageSize);
      console.log("data room-chats", res);
      if (res.code == 200) {
        setData(res.data.dataPage);
        setTotal(res.data.total);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getAllUsersAdmin();
        console.log("data users", res);
        if (res.code == 200) {
          const dataUsers = res.data.map((item) => ({
            label: item.id,
            value: item.id,
          }));
          console.log(dataUsers);
          setDataUsers(dataUsers);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);

  const handleChangeInput = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearch = () => {
    if (pageNo == 1) {
      fetchRoomChats();
    } else {
      setPageNo(1);
    }
  };
  useEffect(() => {
    fetchRoomChats();
  }, [pageNo, reload]);
  const handleSelectChange = (id, userAId, userBId) => {
    let newRooms = [...updateRooms];
    const indexExist = updateRooms.findIndex((item) => item.id == id);
    if (indexExist != -1) {
      newRooms = updateRooms.filter((item) => item.id !== id);
    }
    const newUpdateRooms = [
      ...newRooms,
      {
        id: id,
        userAId: userAId,
        userBId: userBId,
      },
    ];
    setUpdateRooms(newUpdateRooms);
  };
  const handleUpdateRoomChats = async () => {
    try {
      const res = await updateRoomChats(updateRooms);
      if (res.code == 200) {
        setReload((reload) => !reload);
        setChecked(false);
        openNotification("topRight", "Cập nhật thành công", "green");
      } else {
        openNotification("topRight", "Cập nhật thất bại", "red");
      }
    } catch (error) {
      openNotification("topRight", "Cập nhật thất bại", "green");
    }
  };
  const handleChecked = () => {
    setChecked((checked) => !checked);
    setUpdateRooms([]);
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
      title: "Mã khách hàng",
      key: "id",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.userAId}</b>
          </p>
        </>
      ),
    },
    {
      title: "Mã tư vấn viên",
      key: "id",
      render: (_, record) => (
        <>
          <div
            className=""
            style={{ display: "flex", alignItems: "center", gap: "20px" }}
          >
            <p style={{ color: "#0057B8" }}>
              <b>{record.userBId}</b>
            </p>
            {checked && (
              <Select
                options={dataUsers}
                style={{ width: 60 }}
                defaultValue={record.userBId}
                
                onChange={(e) =>
                  handleSelectChange(record.id, record.userAId, e)
                }
              />
            )}
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <div className="input_search" style={{ marginBottom: "20px" }}>
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
      <div className="update-rooms">
        <Checkbox
          checked={checked}
          style={{ marginBottom: "20px" }}
          onChange={handleChecked}
        >
          Chỉnh sửa
        </Checkbox>
        {checked && (
          <Button
            color="danger"
            variant="solid"
            disabled={updateRooms.length == 0}
            onClick={handleUpdateRoomChats}
          >
            Cập nhật
          </Button>
        )}
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
export default ManageRoomChats;
