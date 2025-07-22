import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { API_DOMAIN_SOCKET } from "./variable";
export const connectStomp = (url,data) => {
  const socket = new SockJS(`${API_DOMAIN_SOCKET}/ws`);
  const client = Stomp.over(socket);

  client.connect({}, () => {
    console.log("Đã kết nối tới STOMP");
    client.send(`${url}`, {}, JSON.stringify(data));
  });

  return () => {
    if (client && client.connected) {
      client.disconnect(() => {
        console.log("Đã ngắt kết nối");
      });
    }
  };
};