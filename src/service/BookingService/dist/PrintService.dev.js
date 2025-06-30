"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrintBill = void 0;

var _getAuthorization = require("../getAuthorization");

var getPrintBill = function getPrintBill(id) {
  var res;
  return regeneratorRuntime.async(function getPrintBill$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getFileAuthorization)("bookings/api/prints/bills/".concat(id)));

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

exports.getPrintBill = getPrintBill;