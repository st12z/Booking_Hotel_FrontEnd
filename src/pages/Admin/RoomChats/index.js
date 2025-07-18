import { useEffect, useState } from "react";
import { getRoomChatsOfUser } from "../../../service/RoomService/RoomChatsService";
import { useSelector } from "react-redux";
import { getChatsByRoomChatId } from "../../../service/RoomService/ChatService";
import RoomChatItem from "../../../components/RoomChatItem";
import "./RoomChats.scss";
import { Link } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { API_DOMAIN_SOCKET } from "../../../utils/variable";
function RoomChats() {
  const [roomChats, setRoomChats] = useState([]);
  const user = useSelector((state) => state.user);
  const [reload, setReload] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getRoomChatsOfUser(user.id);
        if (res.code == 200) {
          const newData = [];
          for (const item of res.data) {
            const roomChatId = item.id;
            const resMessages = await getChatsByRoomChatId(roomChatId);
            if (resMessages.data.length > 0) {
              newData.push({
                id: item.id,
                userAId: item.userAId,
                userBId: item.userBId,
                messages: resMessages.data,
              });
            }
          }
          console.log(newData);
          setRoomChats(newData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [reload]);
  useEffect(() => {
    const socket = new SockJS(`${API_DOMAIN_SOCKET}/ws`);

    const client = Stomp.over(socket);
    console.log(socket);
    const token = localStorage.getItem("access_token");
    client.connect({ Authorization: `Bearer ${token}` }, () => {
      console.log("Connected to stomp");
      client.subscribe(
        `/user/${user.email}/queue/notifymessage`,
        (returnMessage) => {
          setReload(Date.now());
        }
      );
    });
  },[]);
  return (
    <>
      <div className="roomchats">
        {roomChats.length > 0 &&
          roomChats.map((item, index) => (
            <Link to={`/admin/room-chats/${item.id}`} key={item.id}>
              <RoomChatItem item={item} />
            </Link>
          ))}
      </div>
    </>
  );
}
export default RoomChats;
