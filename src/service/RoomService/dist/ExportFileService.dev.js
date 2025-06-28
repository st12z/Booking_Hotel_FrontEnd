"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportBills = exports.exportPropertiesRevenue = void 0;

var _getAuthorization = require("../getAuthorization");

var exportPropertiesRevenue = function exportPropertiesRevenue() {
  var res;
  return regeneratorRuntime.async(function exportPropertiesRevenue$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorizationBlob)("rooms/api/export/properties-revenue"));

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

exports.exportPropertiesRevenue = exportPropertiesRevenue;

var exportBills = function exportBills() {
  var res;
  return regeneratorRuntime.async(function exportBills$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorizationBlob)("bookings/api/export/bills"));

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

exports.exportBills = exportBills;