"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllPropertyTypes = void 0;

var _getAuthorization = require("../getAuthorization");

var getAllPropertyTypes = function getAllPropertyTypes() {
  var res;
  return regeneratorRuntime.async(function getAllPropertyTypes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res = (0, _getAuthorization.getAuthorization)("rooms/api/property-types");
          return _context.abrupt("return", res);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAllPropertyTypes = getAllPropertyTypes;