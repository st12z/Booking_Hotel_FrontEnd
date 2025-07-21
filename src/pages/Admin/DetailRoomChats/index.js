import { useEffect, useState } from "react";
import {
  getAllMessages,
  getAllMessagesByRoomChatId,
} from "../../../service/RoomService/ChatService";
import { useParams, useSearchParams } from "react-router-dom";
import { getRoomChatsId } from "../../../service/RoomService/RoomChatsService";
import { Checkbox, Table } from "antd";

function DetailRoomChats() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [roomChat, setRoomChat] = useState();
  const [usersChat, setUsersChat] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resRoomChat = await getRoomChatsId(id);
        if (resRoomChat.code == 200) {
          setUsersChat([
            {
              label: "Khách hàng",
              value: resRoomChat.data.userAId,
            },
            {
              label: "Tư vấn viên",
              value: resRoomChat.data.userBId,
            },
          ]);
          setRoomChat(resRoomChat.data);
        }
        const resMessages = await getAllMessagesByRoomChatId(
          id,
          null,
          pageNo,
          pageSize
        );
        if (resMessages.code == 200) {
          setData(resMessages.data.dataPage);
          setTotal(resMessages.data.total);
        }
        console.log(resMessages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  const fetchMessages = async (pageNo,userId) => {
    try {
      const resMessages = await getAllMessagesByRoomChatId(
        id,
        userId,
        pageNo,
        pageSize
      );
      if (resMessages.code == 200) {
        setData(resMessages.data.dataPage);
        setTotal(resMessages.data.total);
      }
      console.log(resMessages);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMessages(pageNo);
  }, [pageNo]);

  const columns = [
    {
      title: "Mã ID",
      key: "id",
      render: (_, record) => (
        <>
          <p style={{ color: "black" }}>
            <b>{record.id}</b>
          </p>
        </>
      ),
    },
    {
      title: "ID phòng",
      key: "roomChatId",
      render: (_, record) => (
        <>
          <p style={{ color: "black" }}>
            <b>{record.roomChatId}</b>
          </p>
        </>
      ),
    },
    {
      title: "Nội dung",
      key: "content",
      render: (_, record) => (
        <>
          <p >
            {record.userSend==roomChat.userAId ? (
              <b style={{ color: "#0057B8" }}>{record.content}</b>
            ):(
              <b style={{ color: "red" }}>{record.content}</b>
            )}
          </p>
          <div className="" style={{ display: "flex", gap: "20px" }}>
            {record.images.length > 0 &&
              record.images.map((item, index) => (
                <img src={item} key={index} />
              ))}
          </div>
        </>
      ),
    },
    {
      title: "ID người gửi",
      key: "userSend",
      render: (_, record) => (
        <>
          <p >
            {record.userSend==roomChat.userAId ? (
              <b style={{ color: "#0057B8" }}>{record.userSend}</b>
            ):(
              <b style={{ color: "red" }}>{record.userSend}</b>
            )}
          </p>
        </>
      ),
    },
  ];
  const handleChange = (e) => {
    if(e.length==2 || e.length==0){
      fetchMessages(1);
    }
    else{
      fetchMessages(1,e[0]);
    }
  };
  return (
    <>
      <h2>Danh sách tin nhắn phòng chat id-{id}</h2>
      <Checkbox.Group
        options={usersChat}
        onChange={handleChange}
        style={{ marginBottom: "20px" }}
      />
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
export default DetailRoomChats;
