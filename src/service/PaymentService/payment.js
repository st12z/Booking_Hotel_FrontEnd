import { get } from "../../utils/requestPaymentService";
import { getAuthorization } from "../getAuthorization";

export const callBackPayment = async () => {
  const res = await getAuthorization("payments/api/payments/vn-pay-callback");
  return res;
}