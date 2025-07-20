import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getDate,getFormatPrice } from "../../../utils/format"; 
import { Table, Tag } from "antd";
import { getRefundBillById } from "../../../service/BookingService/RefundBillService";
import BillDetail from "../../BillDetail";

function DetailRefundBill() {
  const params = useParams();
  const refundBillId = params.id;
  const [refundBill, setRefundBill] = useState([]);
  const [billCode, setBillCode] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getRefundBillById(refundBillId);
        console.log(res);
        if (res.code == 200) {
          const billCode = res.data.vnp_TxnRef;
          setBillCode(billCode);
          setRefundBill([res.data]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [refundBillId]);
  const columns = [
    {
      title: "Mã ID",
      key: "id",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.id}</b>
          </p>
        </>
      ),
    },
    {
      title: "Mã hóa đơn",
      key: "vnpTxnRef",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.vnp_TxnRef}</b>
          </p>
        </>
      ),
    },
    {
      title: "Email thanh toán",
      key: "vnpTxnRef",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.email}</b>
          </p>
        </>
      ),
    },
    {
      title: "Mã giao dịch",
      key: "vnpTxnRef",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{record.vnp_TransactionNo}</b>
          </p>
        </>
      ),
    },
    {
      title: "Loại hoàn tiền",
      key: "transactionType",
      render: (_, record) => (
        <>
          {record.vnp_TransactionType === "02" ? (
            <Tag color="green">Hoàn tiền toàn phần</Tag>
          ) : (
            <Tag color="red">Hoàn tiền một phần</Tag>
          )}
        </>
      ),
    },
    {
      title: "Tổng số tiền đã thanh toán",
      key: "vnpAmount",
      render: (_, record) => (
        <>
          <p style={{ color: "red" }}>
            <b>{getFormatPrice(record.originPayment)}</b>
          </p>
        </>
      ),
    },
    {
      title: "Tổng số tiền hoàn",
      key: "vnpAmount",
      render: (_, record) => (
        <>
          <p style={{ color: "red" }}>
            <b>{getFormatPrice(record.vnp_Amount)}</b>
          </p>
        </>
      ),
    },
    {
      title: "Ngày hoàn trả",
      key: "createdAt",
      render: (_, record) => (
        <>
          <p style={{ color: "#0057B8" }}>
            <b>{getDate(record.createdAt)}</b>
          </p>
        </>
      ),
    },
  ];
  return (
    <>
      {refundBill && billCode&& (
        <>
          <div className="bill">
            <BillDetail billCodeParent={billCode} />
          </div>
          <div className="refund-bill">
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#0932A0",
              }}
            >
              Thông tin hoá đơn hoàn tiền
            </h2>
            <Table
              dataSource={refundBill}
              columns={columns}
              pagination={false}
              style={{ marginBottom: "30px" }}
            />
          </div>
        </>
      )}
    </>
  );
}
export default DetailRefundBill;
