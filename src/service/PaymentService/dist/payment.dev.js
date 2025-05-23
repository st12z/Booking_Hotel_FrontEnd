"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelBooking = exports.callBackPayment = void 0;

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