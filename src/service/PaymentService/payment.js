import { get } from "../../utils/requestPaymentService";
import { getAuthorization } from "../getAuthorization";

export const callBackPayment = async () => {
  const res = await getAuthorization("payments/api/payments/vn-pay-callback");
  return res;
}
export const cancelBooking = async(billCode)=>{
  const res = await getAuthorization(`payments/api/payments/refund/${billCode}`);
  return res;
}