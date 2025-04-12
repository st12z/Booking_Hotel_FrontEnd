"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatLocalDateTime = void 0;

var formatLocalDateTime = function formatLocalDateTime(value) {
  if (!value) return ""; // Nếu không có giá trị, trả về rỗng

  var date = new Date(value);
  if (isNaN(date.getTime())) return ""; // Nếu không hợp lệ, trả về rỗng

  return date.toISOString().replace("Z", "");
};

exports.formatLocalDateTime = formatLocalDateTime;