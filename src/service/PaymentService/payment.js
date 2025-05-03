import { get } from "../../utils/requestPaymentService";

export const callBackPayment = async () => {
  const res = await get("payment/vn-pay-callback");
  return res;
}