import { useEffect, useState } from "react";
import { getRoomChatsOfUser } from "../../../service/RoomService/RoomChatsService";
import { useSelector } from "react-redux";
import { getChatsByRoomChatId } from "../../../service/RoomService/ChatService";
import RoomChatItem from "../../../components/RoomChatItem";
import "./RoomChats.scss";
import { Link } from "react-router-dom";
function RoomChats() {
  const [roomChats, setRoomChats] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getRoomChatsOfUser(user.id);
        console.log(res);
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
  }, []);
  return (
    <>
      <div className="roomchats">
        {roomChats.length > 0 &&
          roomChats.map((item, index) => (
            <Link to={`/admin/room-chats/${item.id}`}>
              <RoomChatItem item={item} key={index} />
            </Link>
          ))}
      </div>
    </>
  );
}
export default RoomChats;
