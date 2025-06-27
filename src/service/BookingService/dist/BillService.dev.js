"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllBillTypeStatus = exports.getAmountRevenueByMonth = exports.getAmountBillsByMonth = exports.getAmountRevenueToday = exports.getAmountBillsToday = exports.getBillByBillCode = exports.getBillByKeyword = exports.getMyBills = exports.getSearchBills = exports.getRecentlyBills = exports.getAllBills = void 0;

var _requestBookingService = require("../../utils/requestBookingService");

var _getAuthorization = require("../getAuthorization");

var getAllBills = function getAllBills(data) {
  var res;
  return regeneratorRuntime.async(function getAllBills$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("bookings/api/bills/all", data));

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

var getRecentlyBills = function getRecentlyBills() {
  var res;
  return regeneratorRuntime.async(function getRecentlyBills$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/recently"));

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

exports.getRecentlyBills = getRecentlyBills;

var getSearchBills = function getSearchBills(keyword) {
  var pageNo,
      pageSize,
      res,
      _args3 = arguments;
  return regeneratorRuntime.async(function getSearchBills$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          pageNo = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 1;
          pageSize = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 10;
          _context3.next = 4;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/search?keyword=".concat(keyword, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize)));

        case 4:
          res = _context3.sent;
          return _context3.abrupt("return", res);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getSearchBills = getSearchBills;

var getMyBills = function getMyBills() {
  var pageNo,
      pageSize,
      keyword,
      res,
      _args4 = arguments;
  return regeneratorRuntime.async(function getMyBills$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          pageNo = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : 1;
          pageSize = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 5;
          keyword = _args4.length > 2 ? _args4[2] : undefined;
          _context4.next = 5;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills?pageNo=".concat(pageNo, "&pageSize=").concat(pageSize, "&keyword=").concat(keyword)));

        case 5:
          res = _context4.sent;
          return _context4.abrupt("return", res);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getMyBills = getMyBills;

var getBillByKeyword = function getBillByKeyword(email, pageNo, pageSize, keyword) {
  var res;
  return regeneratorRuntime.async(function getBillByKeyword$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/search?email=".concat(email, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize, "&keyword=").concat(keyword)));

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

exports.getBillByKeyword = getBillByKeyword;

var getBillByBillCode = function getBillByBillCode(billCode) {
  var res;
  return regeneratorRuntime.async(function getBillByBillCode$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/".concat(billCode)));

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

exports.getBillByBillCode = getBillByBillCode;

var getAmountBillsToday = function getAmountBillsToday() {
  var res;
  return regeneratorRuntime.async(function getAmountBillsToday$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/amount-bills-today"));

        case 2:
          res = _context7.sent;
          return _context7.abrupt("return", res);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.getAmountBillsToday = getAmountBillsToday;

var getAmountRevenueToday = function getAmountRevenueToday() {
  var res;
  return regeneratorRuntime.async(function getAmountRevenueToday$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/amount-revenue-today"));

        case 2:
          res = _context8.sent;
          return _context8.abrupt("return", res);

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.getAmountRevenueToday = getAmountRevenueToday;

var getAmountBillsByMonth = function getAmountBillsByMonth(month) {
  var result;
  return regeneratorRuntime.async(function getAmountBillsByMonth$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/amount-bills-month?month=".concat(month)));

        case 2:
          result = _context9.sent;
          return _context9.abrupt("return", result);

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
};

exports.getAmountBillsByMonth = getAmountBillsByMonth;

var getAmountRevenueByMonth = function getAmountRevenueByMonth(month) {
  var result;
  return regeneratorRuntime.async(function getAmountRevenueByMonth$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/amount-revenue-month?month=".concat(month)));

        case 2:
          result = _context10.sent;
          return _context10.abrupt("return", result);

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
};

exports.getAmountRevenueByMonth = getAmountRevenueByMonth;

var getAllBillTypeStatus = function getAllBillTypeStatus() {
  var res;
  return regeneratorRuntime.async(function getAllBillTypeStatus$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/bills/bill-type-status"));

        case 2:
          res = _context11.sent;
          return _context11.abrupt("return", res);

        case 4:
        case "end":
          return _context11.stop();
      }
    }
  });
};

exports.getAllBillTypeStatus = getAllBillTypeStatus;