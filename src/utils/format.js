export const formatLocalDateTime = (value) => {
    if (!value) return ""; // Nếu không có giá trị, trả về rỗng

    const date = new Date(value);
    if (isNaN(date.getTime())) return ""; // Nếu không hợp lệ, trả về rỗng

    return date.toISOString().replace("Z", "");
};