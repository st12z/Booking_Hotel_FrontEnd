export const isTokenExpired = (token) => {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split(".")[1]));
  const exp = payload.exp; // timestamp

  // Kiểm tra nếu thời gian hiện tại > thời gian hết hạn
  return Date.now() >= exp * 1000;
};