import { useEffect, useState } from "react";
import { getInfoUserById } from "../../service/UserService/AuthService";
import { getTime } from "../../utils/format";

function RoomChatItem({item}){
  const messageLast = item.messages[item.messages.length-1];
  console.log(messageLast);
  const [userSend,setUserSend]=useState([]);
  useEffect(()=>{
    const fetchApi=async()=>{
      try{
        const res = await getInfoUserById(messageLast.userSend);
        if(res.code==200){
          setUserSend(res.data);
        }
      }catch(error){
        console.log(error);
      }
    };
    fetchApi();
  },[]);
  return(
    <>
      <div className="roomchats__item">
        <div className="roomchats__item__image">
          <img src={userSend?.avatar} />
        </div>
        <div className="roomchats__item__content">
          <p>{userSend.firstName} {userSend.lastName}</p>
          <p>{messageLast.content}</p>
        </div>
        <div className="roomchats__item__time">
          <p>{getTime(messageLast.createdAt)}</p>
        </div>
      </div>
    </>
  )
}
export default RoomChatItem;