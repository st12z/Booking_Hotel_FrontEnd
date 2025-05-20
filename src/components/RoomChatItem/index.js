import { useEffect, useState } from "react";
import { getInfoUserById } from "../../service/UserService/AuthService";
import { getTime } from "../../utils/format";
import { useSelector } from "react-redux";

function RoomChatItem({item}){
  const messageLast = item.messages[item.messages.length-1];
  const [userB,setUserB]=useState([]);
  const user = useSelector(state=>state.user);
  useEffect(()=>{
    const fetchApi=async()=>{
      try{
        const res = await getInfoUserById(user.id == item.userAId ? item.userBId:item.userAId);
        console.log(res);
        if(res.code==200){
          setUserB(res.data);
        }
      }catch(error){
        console.log(error);
      }
    };
    fetchApi();
  },[item]);
  return(
    <>
      <div className="roomchats__item">
        <div className="roomchats__item__image">
          <img src={userB.avatar} />
        </div>
        <div className="roomchats__item__content">
          <p>{userB.firstName} {userB.lastName}</p>
          <p>{messageLast.userSend == userB.id ? userB.lastName : 'Bạn'}: {messageLast.content}</p>
        </div>
        <div className="roomchats__item__time">
          <p>{getTime(messageLast.createdAt)}</p>
        </div>
      </div>
    </>
  )
}
export default RoomChatItem;