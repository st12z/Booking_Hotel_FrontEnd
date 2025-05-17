"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormatPrice = exports.getTotalDay = exports.getTime = exports.getDate = exports.formatLocalDateTime = void 0;

var formatLocalDateTime = function formatLocalDateTime(value) {
  if (!value) return "";

  if (typeof value === "string") {
    value = value.trim(); // <-- Thêm dòng này
  }

  if (typeof value.format === "function") {
    return value.format("YYYY-MM-DDTHH:mm:ss");
  }

  var date = new Date(value);
  if (isNaN(date.getTime())) return "";

  var pad = function pad(num) {
    return num.toString().padStart(2, "0");
  };

  return "".concat(date.getFullYear(), "-").concat(pad(date.getMonth() + 1), "-").concat(pad(date.getDate()), "T").concat(pad(date.getHours()), ":").concat(pad(date.getMinutes()), ":").concat(pad(date.getSeconds()));
};

exports.formatLocalDateTime = formatLocalDateTime;

var getDate = function getDate(dateString) {
  var date = new Date(dateString);
  var day = String(date.getDate()).padStart(2, "0");
  var month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0

  var year = date.getFullYear();
  return "".concat(day, "-").concat(month, "-").concat(year);
};

exports.getDate = getDate;

var getTime = function getTime(dateString) {
  var date = new Date(dateString);
  var hours = String(date.getHours()).padStart(2, "0");
  var minutes = String(date.getMinutes()).padStart(2, "0");
  return "".concat(hours, ":").concat(minutes);
};

exports.getTime = getTime;

var getTotalDay = function getTotalDay(checkIn, checkOut) {
  var checkInDate = new Date(checkIn);
  var checkOutDate = new Date(checkOut);
  var totalDay = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)); // chia cho số ms trong 1 ngày

  return totalDay;
};

exports.getTotalDay = getTotalDay;

var getFormatPrice = function getFormatPrice(price) {
  return "".concat(new Intl.NumberFormat("vi-VN").format(price), " VN\u0110");
};

exports.getFormatPrice = getFormatPrice;