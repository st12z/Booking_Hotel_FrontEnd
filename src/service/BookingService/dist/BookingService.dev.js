"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmBooking = void 0;

var _requestBookingService = require("../../utils/requestBookingService");

var _getAuthorization = require("../getAuthorization");

var confirmBooking = function confirmBooking(uniqueCheck) {
  var res;
  return regeneratorRuntime.async(function confirmBooking$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bookings/confirm?uniqueCheck=".concat(uniqueCheck)));

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

exports.confirmBooking = confirmBooking;