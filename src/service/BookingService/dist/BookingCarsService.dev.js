"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBookingCarsByBillId = void 0;

var _requestBookingService = require("../../utils/requestBookingService");

var getBookingCarsByBillId = function getBookingCarsByBillId(billId) {
  var res;
  return regeneratorRuntime.async(function getBookingCarsByBillId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res = (0, _requestBookingService.get)("bookingcars/".concat(billId));
          return _context.abrupt("return", res);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getBookingCarsByBillId = getBookingCarsByBillId;