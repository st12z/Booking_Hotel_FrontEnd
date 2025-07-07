"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportTransactions = exports.exportRefundBills = exports.exportBills = void 0;

var _getAuthorization = require("../getAuthorization");

var exportBills = function exportBills() {
  var res;
  return regeneratorRuntime.async(function exportBills$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorizationBlob)("bookings/api/export/bills"));

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

exports.exportBills = exportBills;

var exportRefundBills = function exportRefundBills() {
  var res;
  return regeneratorRuntime.async(function exportRefundBills$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorizationBlob)("bookings/api/export/refund-bills"));

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

exports.exportRefundBills = exportRefundBills;

var exportTransactions = function exportTransactions() {
  var res;
  return regeneratorRuntime.async(function exportTransactions$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorizationBlob)("payments/api/export"));

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

exports.exportTransactions = exportTransactions;