export const formatLocalDateTime = (value) => {
  if (!value) return "";
  if (typeof value.format === "function") {
    return value.format("YYYY-MM-DDTHH:mm:ss");
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) return "";
  const pad = (num) => num.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};
