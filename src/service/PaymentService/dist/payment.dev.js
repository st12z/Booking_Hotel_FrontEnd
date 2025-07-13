"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnclockedUserIdsTrans = exports.getPaymentTransactionLocked = exports.getSuspiciousTransByKeyword = exports.getAllSuspiciousTransByFilter = exports.getAllSuspiciousTransType = exports.getCheckOtp = exports.checkBookingPolicy = exports.getSearchTransaction = exports.getAllTransactionTypes = exports.getAllPaymentTransactions = exports.getStatisticTransactionType = exports.getRevenuePaymentTransactionByMonth = exports.getAmountTransactionByMonth = exports.cancelBooking = exports.callBackPayment = void 0;

var _requestPaymentService = require("../../utils/requestPaymentService");

var _getAuthorization = require("../getAuthorization");

var callBackPayment = function callBackPayment() {
  var res;
  return regeneratorRuntime.async(function callBackPayment$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("payments/api/payments/vn-pay-callback"));

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

exports.callBackPayment = callBackPayment;

var cancelBooking = function cancelBooking(billCode) {
  var res;
  return regeneratorRuntime.async(function cancelBooking$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("payments/api/payments/refund/".concat(billCode)));

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

exports.cancelBooking = cancelBooking;

var getAmountTransactionByMonth = function getAmountTransactionByMonth(filter) {
  var res;
  return regeneratorRuntime.async(function getAmountTransactionByMonth$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("payments/api/payments/amount-transaction-month", filter));

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

exports.getAmountTransactionByMonth = getAmountTransactionByMonth;

var getRevenuePaymentTransactionByMonth = function getRevenuePaymentTransactionByMonth(filter) {
  var res;
  return regeneratorRuntime.async(function getRevenuePaymentTransactionByMonth$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("payments/api/payments/revenue-transaction-month", filter));

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

exports.getRevenuePaymentTransactionByMonth = getRevenuePaymentTransactionByMonth;

var getStatisticTransactionType = function getStatisticTransactionType(month) {
  var res;
  return regeneratorRuntime.async(function getStatisticTransactionType$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("payments/api/payments/statistic-transactiontype-month/".concat(month)));

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

exports.getStatisticTransactionType = getStatisticTransactionType;

var getAllPaymentTransactions = function getAllPaymentTransactions(filter) {
  var res;
  return regeneratorRuntime.async(function getAllPaymentTransactions$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("payments/api/payments/list-transactions", filter));

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

exports.getAllPaymentTransactions = getAllPaymentTransactions;

var getAllTransactionTypes = function getAllTransactionTypes() {
  var res;
  return regeneratorRuntime.async(function getAllTransactionTypes$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("payments/api/payments/transaction-types"));

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

exports.getAllTransactionTypes = getAllTransactionTypes;

var getSearchTransaction = function getSearchTransaction(keyword, pageNo, pageSize) {
  var res;
  return regeneratorRuntime.async(function getSearchTransaction$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("payments/api/payments/search?keyword=".concat(keyword, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize)));

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

exports.getSearchTransaction = getSearchTransaction;

var checkBookingPolicy = function checkBookingPolicy(data) {
  var res;
  return regeneratorRuntime.async(function checkBookingPolicy$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("payments/api/payments/check-booking", data));

        case 2:
          res = _context9.sent;
          return _context9.abrupt("return", res);

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
};

exports.checkBookingPolicy = checkBookingPolicy;

var getCheckOtp = function getCheckOtp(otp, uniqueCheck) {
  var res;
  return regeneratorRuntime.async(function getCheckOtp$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("payments/api/payments/check-otp?otp=".concat(otp, "&uniqueCheck=").concat(uniqueCheck)));

        case 2:
          res = _context10.sent;
          return _context10.abrupt("return", res);

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
};

exports.getCheckOtp = getCheckOtp;

var getAllSuspiciousTransType = function getAllSuspiciousTransType() {
  var res;
  return regeneratorRuntime.async(function getAllSuspiciousTransType$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("payments/api/suspicious-transaction/get-types"));

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

exports.getAllSuspiciousTransType = getAllSuspiciousTransType;

var getAllSuspiciousTransByFilter = function getAllSuspiciousTransByFilter(filter) {
  var res;
  return regeneratorRuntime.async(function getAllSuspiciousTransByFilter$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("payments/api/suspicious-transaction/filter", filter));

        case 2:
          res = _context12.sent;
          return _context12.abrupt("return", res);

        case 4:
        case "end":
          return _context12.stop();
      }
    }
  });
};

exports.getAllSuspiciousTransByFilter = getAllSuspiciousTransByFilter;

var getSuspiciousTransByKeyword = function getSuspiciousTransByKeyword(keyword, pageNo, pageSize) {
  var res;
  return regeneratorRuntime.async(function getSuspiciousTransByKeyword$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("payments/api/suspicious-transaction/keyword?pageNo=".concat(pageNo, "&pageSize=").concat(pageSize, "&keyword=").concat(keyword)));

        case 2:
          res = _context13.sent;
          return _context13.abrupt("return", res);

        case 4:
        case "end":
          return _context13.stop();
      }
    }
  });
};

exports.getSuspiciousTransByKeyword = getSuspiciousTransByKeyword;

var getPaymentTransactionLocked = function getPaymentTransactionLocked(keyword, pageNo, pageSize) {
  var res;
  return regeneratorRuntime.async(function getPaymentTransactionLocked$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("payments/api/suspicious-transaction/payment-trans-locked?pageNo=".concat(pageNo, "&pageSize=").concat(pageSize, "&keyword=").concat(keyword)));

        case 2:
          res = _context14.sent;
          return _context14.abrupt("return", res);

        case 4:
        case "end":
          return _context14.stop();
      }
    }
  });
};

exports.getPaymentTransactionLocked = getPaymentTransactionLocked;

var getUnclockedUserIdsTrans = function getUnclockedUserIdsTrans(userIds) {
  var res;
  return regeneratorRuntime.async(function getUnclockedUserIdsTrans$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("payments/api/suspicious-transaction/unclocked", userIds));

        case 2:
          res = _context15.sent;
          return _context15.abrupt("return", res);

        case 4:
        case "end":
          return _context15.stop();
      }
    }
  });
};

exports.getUnclockedUserIdsTrans = getUnclockedUserIdsTrans;