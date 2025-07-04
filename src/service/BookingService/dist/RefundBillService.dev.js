"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearchRefundBills = exports.getAllRefundBills = void 0;

var _getAuthorization = require("../getAuthorization");

var getAllRefundBills = function getAllRefundBills(filter) {
  var res;
  return regeneratorRuntime.async(function getAllRefundBills$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("bookings/api/refund-bills/filter", filter));

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

exports.getAllRefundBills = getAllRefundBills;

var getSearchRefundBills = function getSearchRefundBills(keyword) {
  var res;
  return regeneratorRuntime.async(function getSearchRefundBills$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/refund-bills/search?keyword=".concat(keyword)));

        case 2:
          res = _context2.sent;
          return _context2.abrupt("return", res);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getSearchRefundBills = getSearchRefundBills;