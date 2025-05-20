import { postImages } from "../../utils/requestRoomService";
import { postImagesAuthorization } from "../getAuthorization";

export const uploadImages = async(data)=>{
  const res = await postImagesAuthorization("rooms/api/upload",data);
  return res;
}