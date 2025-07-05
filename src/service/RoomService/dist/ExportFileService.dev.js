"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportPropertiesRevenue = void 0;

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