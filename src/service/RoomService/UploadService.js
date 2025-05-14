import { postImages } from "../../utils/requestRoomService";

export const uploadImages = async(data)=>{
  const res = await postImages("upload",data);
  return res;
}