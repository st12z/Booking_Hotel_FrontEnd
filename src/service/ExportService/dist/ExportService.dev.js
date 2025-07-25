"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportTripTypes = exports.exportTrips = exports.exportListCities = exports.exportPaymentTranLogs = exports.exportTransactions = exports.exportRefundBills = exports.exportBills = void 0;

var _getAuthorization = require("../getAuthorization");

// bookings
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
}; //payments


exports.exportRefundBills = exportRefundBills;

var exportTransactions = function exportTransactions() {
  var res;
  return regeneratorRuntime.async(function exportTransactions$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorizationBlob)("payments/api/export/payment-transactions"));

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

var exportPaymentTranLogs = function exportPaymentTranLogs() {
  var res;
  return regeneratorRuntime.async(function exportPaymentTranLogs$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorizationBlob)("payments/api/export/suspicious-tran-logs"));

        case 2:
          res = _context4.sent;
          return _context4.abrupt("return", res);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}; //rooms


exports.exportPaymentTranLogs = exportPaymentTranLogs;

var exportListCities = function exportListCities() {
  var res;
  return regeneratorRuntime.async(function exportListCities$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorizationBlob)("rooms/api/export/cities"));

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

exports.exportListCities = exportListCities;

var exportTrips = function exportTrips() {
  var res;
  return regeneratorRuntime.async(function exportTrips$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorizationBlob)("rooms/api/export/trips"));

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

exports.exportTrips = exportTrips;

var exportTripTypes = function exportTripTypes() {
  var res;
  return regeneratorRuntime.async(function exportTripTypes$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorizationBlob)("rooms/api/export/triptypes"));

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

exports.exportTripTypes = exportTripTypes;