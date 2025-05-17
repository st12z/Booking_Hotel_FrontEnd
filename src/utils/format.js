export const formatLocalDateTime = (value) => {
  if (!value) return "";
  if (typeof value === "string") {
    value = value.trim(); // <-- Thêm dòng này
  }
  if (typeof value.format === "function") {
    return value.format("YYYY-MM-DDTHH:mm:ss");
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) return "";
  const pad = (num) => num.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
};


export const getDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
export const getTime = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const getTotalDay = (checkIn, checkOut) => {
  let checkInDate = new Date(checkIn);
  let checkOutDate = new Date(checkOut);

  let totalDay = Math.ceil((checkOutDate- checkInDate) / (1000 * 60 * 60 * 24)); // chia cho số ms trong 1 ngày

  return totalDay;
};
export const getFormatPrice=(price)=>{
  return `${new Intl.NumberFormat("vi-VN").format(price)} VNĐ`;
}
