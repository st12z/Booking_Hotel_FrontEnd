"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProperty = exports.getPropertiesByKeyword = exports.getAmountProperties = exports.getPropertyId = exports.getPropertiesBySuggest = exports.getPropertyBySlug = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var _getAuthorization = require("../getAuthorization");

var getPropertyBySlug = function getPropertyBySlug(path) {
  var result;
  return regeneratorRuntime.async(function getPropertyBySlug$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("properties/slug/".concat(path)));

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

exports.getPropertyBySlug = getPropertyBySlug;

var getPropertiesBySuggest = function getPropertiesBySuggest(data) {
  var result;
  return regeneratorRuntime.async(function getPropertiesBySuggest$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.post)("properties", data));

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

exports.getPropertiesBySuggest = getPropertiesBySuggest;

var getPropertyId = function getPropertyId(id) {
  var result;
  return regeneratorRuntime.async(function getPropertyId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("properties/id/".concat(id)));

        case 2:
          result = _context3.sent;
          return _context3.abrupt("return", result);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getPropertyId = getPropertyId;

var getAmountProperties = function getAmountProperties(id) {
  var result;
  return regeneratorRuntime.async(function getAmountProperties$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/properties/amount-properties"));

        case 2:
          result = _context4.sent;
          return _context4.abrupt("return", result);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getAmountProperties = getAmountProperties;

var getPropertiesByKeyword = function getPropertiesByKeyword(filter) {
  var result;
  return regeneratorRuntime.async(function getPropertiesByKeyword$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("rooms/api/properties/filter", filter));

        case 2:
          result = _context5.sent;
          return _context5.abrupt("return", result);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.getPropertiesByKeyword = getPropertiesByKeyword;

var updateProperty = function updateProperty(data) {
  var result;
  return regeneratorRuntime.async(function updateProperty$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postImagesAuthorization)("rooms/api/properties/update", data));

        case 2:
          result = _context6.sent;
          return _context6.abrupt("return", result);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.updateProperty = updateProperty;