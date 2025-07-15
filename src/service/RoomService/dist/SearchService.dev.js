"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropertiesFilterAfterSearch = exports.getPropertiesBySearch = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var getPropertiesBySearch = function getPropertiesBySearch(query) {
  var result;
  return regeneratorRuntime.async(function getPropertiesBySearch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("search?".concat(query)));

        case 2:
          result = _context.sent;
          return _context.abrupt("return", result);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getPropertiesBySearch = getPropertiesBySearch;

var getPropertiesFilterAfterSearch = function getPropertiesFilterAfterSearch(query, data) {
  var result;
  return regeneratorRuntime.async(function getPropertiesFilterAfterSearch$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.post)("search?".concat(query), data));

        case 2:
          result = _context2.sent;
          return _context2.abrupt("return", result);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getPropertiesFilterAfterSearch = getPropertiesFilterAfterSearch;