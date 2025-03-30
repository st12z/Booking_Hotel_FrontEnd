export const formatLocalDateTime = (value) => {
    if (!value) return null; // Nếu không có giá trị, trả về rỗng

    const date = new Date(value);
    if (isNaN(date.getTime())) return null; // Nếu không hợp lệ, trả về rỗng

    return date.toISOString().replace("Z", "");
};