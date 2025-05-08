"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBookingRoomsByBillId = void 0;

var _requestBookingService = require("../../utils/requestBookingService");

var getBookingRoomsByBillId = function getBookingRoomsByBillId(billId) {
  var res;
  return regeneratorRuntime.async(function getBookingRoomsByBillId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _requestBookingService.get)("bookingrooms/".concat(billId)));

        case 2:
          res = _context.sent;
          return _context.abrupt("return", res);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getBookingRoomsByBillId = getBookingRoomsByBillId;