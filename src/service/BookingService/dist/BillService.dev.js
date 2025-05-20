"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAmountRevenueByMonth = exports.getAmountBillsByMonth = exports.getAmountRevenueToday = exports.getAmountBillsToday = exports.getBillByBillCode = exports.getBillByKeyword = exports.getMyBills = exports.getAllBills = void 0;

var _requestBookingService = require("../../utils/requestBookingService");

var _getAuthorization = require("../getAuthorization");

var getAllBills = function getAllBills() {
  var res;
  return regeneratorRuntime.async(function getAllBills$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/all"));

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

exports.getAllBills = getAllBills;

var getMyBills = function getMyBills(email) {
  var pageNo,
      pageSize,
      keyword,
      res,
      _args2 = arguments;
  return regeneratorRuntime.async(function getMyBills$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          pageNo = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 1;
          pageSize = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 5;
          keyword = _args2.length > 3 ? _args2[3] : undefined;
          _context2.next = 5;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills?email=".concat(email, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize, "&keyword=").concat(keyword)));

        case 5:
          res = _context2.sent;
          return _context2.abrupt("return", res);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getMyBills = getMyBills;

var getBillByKeyword = function getBillByKeyword(email, pageNo, pageSize, keyword) {
  var res;
  return regeneratorRuntime.async(function getBillByKeyword$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/search?email=".concat(email, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize, "&keyword=").concat(keyword)));

        case 2:
          res = _context3.sent;
          return _context3.abrupt("return", res);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getBillByKeyword = getBillByKeyword;

var getBillByBillCode = function getBillByBillCode(billCode) {
  var res;
  return regeneratorRuntime.async(function getBillByBillCode$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/".concat(billCode)));

        case 2:
          res = _context4.sent;
          return _context4.abrupt("return", res);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getBillByBillCode = getBillByBillCode;

var getAmountBillsToday = function getAmountBillsToday() {
  var res;
  return regeneratorRuntime.async(function getAmountBillsToday$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/amount-bills-today"));

        case 2:
          res = _context5.sent;
          return _context5.abrupt("return", res);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.getAmountBillsToday = getAmountBillsToday;

var getAmountRevenueToday = function getAmountRevenueToday() {
  var res;
  return regeneratorRuntime.async(function getAmountRevenueToday$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/amount-revenue-today"));

        case 2:
          res = _context6.sent;
          return _context6.abrupt("return", res);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.getAmountRevenueToday = getAmountRevenueToday;

var getAmountBillsByMonth = function getAmountBillsByMonth(month) {
  var result;
  return regeneratorRuntime.async(function getAmountBillsByMonth$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/amount-bills-month?month=".concat(month)));

        case 2:
          result = _context7.sent;
          return _context7.abrupt("return", result);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.getAmountBillsByMonth = getAmountBillsByMonth;

var getAmountRevenueByMonth = function getAmountRevenueByMonth(month) {
  var result;
  return regeneratorRuntime.async(function getAmountRevenueByMonth$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/amount-revenue-month?month=".concat(month)));

        case 2:
          result = _context8.sent;
          return _context8.abrupt("return", result);

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.getAmountRevenueByMonth = getAmountRevenueByMonth;