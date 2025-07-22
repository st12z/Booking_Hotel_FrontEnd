import "./Chat.scss";
import { SendOutlined, SmileOutlined, UploadOutlined } from "@ant-design/icons";
import EmojiPicker from "emoji-picker-react";
import { FileUploadWithPreview } from "file-upload-with-preview";
import { useEffect, useRef, useState } from "react";
import "file-upload-with-preview/dist/style.css";
import { useSelector } from "react-redux";
import { getChatsByRoomChatId } from "../../service/RoomService/ChatService";
import { getInfoUserById } from "../../service/UserService/AuthService";
import { uploadImages } from "../../service/RoomService/UploadService";
import SockJS from "sockjs-client";
import { API_DOMAIN_SOCKET } from "../../utils/variable";
import { Stomp } from "@stomp/stompjs";
import { getRoomChatsOfUser } from "../../service/RoomService/RoomChatsService";
function Chat() {
  const user = useSelector((state) => state.user);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const upload = useRef(null);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [userB, setUserB] = useState();
  const [roomChatId, setRoomChatId] = useState();
  const [stompClient, setStompClient] = useState(null);
  const handleClickEmoji = () => {
    setShowEmoji(!showEmoji);
    setShowImage(false);
  };
  const handleUploadImage = () => {
    setShowImage(!showImage);
    setShowEmoji(false);
  };
  const fetchUserB = async (userBId) => {
    try {
      console.log(userBId);
      const res = await getInfoUserById(userBId);
      console.log(res);
      if (res.code == 200) {
        setUserB(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUpload = async (files) => {
    try {
      const formData = new FormData();
      files.forEach((image) => formData.append("images", image));
      const res = await uploadImages(formData);
      return res.data;
    } catch (error) {}
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getRoomChatsOfUser(user.id);
        console.log(user.id);
        console.log(res);
        if (res.code == 200) {
          const roomChatId = res.data[0]?.id;
          setRoomChatId(roomChatId);
          let userBId;
          if (res.data[0].userAId !== user.id) {
            userBId = res.data[0].userAId;
          }
          if (res.data[0].userBId !== user.id) {
            userBId = res.data[0].userBId;
          }
          fetchUserB(userBId);
          const resChats = await getChatsByRoomChatId(roomChatId);
          setMessages(resChats.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    upload.current = new FileUploadWithPreview("my-unique-id", {
      showDeleteButtonOnImages: true,
      text: {
        chooseFile: "Chọn ảnh",
        browse: "Duyệt",
      },
      multiple: true,
    });
  }, []);
  // kết nối đến server và nhận phản hồi
  useEffect(() => {
    if (roomChatId) {
      const socket = new SockJS(`${API_DOMAIN_SOCKET}/ws`);

      const client = Stomp.over(socket);
      console.log(socket);
      // Nhận tin nhắn phản hồi từ
      client.connect({}, () => {
        console.log("Connected to stomp");
        client.subscribe(`/topic/rooms/${roomChatId}`, (returnMessage) => {
          console.log(returnMessage);
          const message = JSON.parse(returnMessage.body);
          console.log(message);
          setMessages((prev) => [
            ...prev,
            {
              userSend: message.userSend,
              roomChatId: message.roomChatId,
              content: message.content,
              images: message.images,
            },
          ]);
        });
        setStompClient(client);
      });

      return () => {
        if (client) {
          console.log("disconnected");
          client.disconnect();
        }
      };
    }
  }, [roomChatId]);

  const handleChooseEmoji = (e) => {
    const emojiUnicode = e.emoji;
    setInputText((prev) => prev + emojiUnicode);
  };
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  const handleSendMessage = async () => {
    const data = {
      roomChatId: roomChatId,
      userSend: user.id,
      content: "",
      images: [],
    };
    const files = upload.current.cachedFileArray;
    console.log(files);
    if (files && files.length > 0) {
      const images = await fetchUpload(files);
      data.images = images;
    }
    if (inputText.length > 0) {
      data.content = inputText;
    }
    if (stompClient && stompClient.connected) {
      if (inputText || files.length > 0) {
        stompClient.send(
          `/app/sendMessage/${roomChatId}`,
          {},
          JSON.stringify(data)
        );
        stompClient.send(
          `/app/sendNotification`,
          {},
          JSON.stringify({
            content: `${user.email} đã gửi tin nhắn!`,
          })
        );
        stompClient.send(
          `/app/sendNotifyMessage`,
          {},
          JSON.stringify({
            content: `${user.email} đã gửi tin nhắn!`,
          })
        );
        setInputText("");
      }
    } else {
      console.error("STOMP client not ready send");
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="chat">
        <h2 className="chat__header">Liên hệ</h2>
        {messages.map((item, index) =>
          item.userSend === user.id ? (
            <div className="chat__send">
              <div className="chat__send__info">
                <img src={user.avatar} />
                <p>{user.lastName}</p>
              </div>
              <div className="chat__send__content">
                {item.content && <p>{item.content}</p>}
                {item.images &&
                  item.images.map((item, index) => (
                    <img src={item} style={{ width: "150px" }} />
                  ))}
              </div>
            </div>
          ) : (
            <div className="chat__accept">
              <div className="chat__accept__info">
                <img src={userB?.avatar} />
                <p>{userB?.lastName}</p>
              </div>
              <div className="chat__accept__content">
                {item.content && <p>{item.content}</p>}
                {item.images &&
                  item.images.map((item, index) => (
                    <img src={item} style={{ width: "150px" }} />
                  ))}
              </div>
            </div>
          )
        )}

        <div className="chat__input-send">
          <input
            type="text"
            name="content"
            value={inputText}
            onChange={handleInputChange}
          />
          <SendOutlined className="icon" onClick={handleSendMessage} />
          <SmileOutlined className="icon" onClick={handleClickEmoji} />
          <div>
            <EmojiPicker
              open={showEmoji}
              className="emoji"
              onEmojiClick={handleChooseEmoji}
            />
          </div>
          <UploadOutlined className="icon" onClick={handleUploadImage} />
          <div
            className={
              showImage
                ? `custom-file-container`
                : `custom-file-container hidden`
            }
            data-upload-id="my-unique-id"
          ></div>
        </div>
      </div>
    </div>
  );
}
export default Chat;
