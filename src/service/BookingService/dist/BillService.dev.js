"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBillByKeyword = exports.getMyBills = void 0;

var _requestBookingService = require("../../utils/requestBookingService");

var getMyBills = function getMyBills(email) {
  var pageNo,
      pageSize,
      res,
      _args = arguments;
  return regeneratorRuntime.async(function getMyBills$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          pageNo = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
          pageSize = _args.length > 2 && _args[2] !== undefined ? _args[2] : 5;
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _requestBookingService.get)("bills?email=".concat(email, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize)));

        case 4:
          res = _context.sent;
          return _context.abrupt("return", res);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getMyBills = getMyBills;

var getBillByKeyword = function getBillByKeyword(email, pageNo, pageSize, keyword) {
  var res;
  return regeneratorRuntime.async(function getBillByKeyword$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestBookingService.get)("bills/search?email=".concat(email, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize, "&keyword=").concat(keyword)));

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

exports.getBillByKeyword = getBillByKeyword;