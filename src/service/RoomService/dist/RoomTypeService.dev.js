"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkBookingRooms = exports.holdRooms = exports.getRoomTypeById = exports.checkEnoughQuantityRooms = exports.getRoomTypesBySearchRequest = exports.getRoomTypesBySlugProperty = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var getRoomTypesBySlugProperty = function getRoomTypesBySlugProperty(query) {
  var result;
  return regeneratorRuntime.async(function getRoomTypesBySlugProperty$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("roomtypes?".concat(query)));

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

exports.getRoomTypesBySlugProperty = getRoomTypesBySlugProperty;

var getRoomTypesBySearchRequest = function getRoomTypesBySearchRequest(query, data) {
  var result;
  return regeneratorRuntime.async(function getRoomTypesBySearchRequest$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.post)("roomtypes?".concat(query), data));

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

exports.getRoomTypesBySearchRequest = getRoomTypesBySearchRequest;

var checkEnoughQuantityRooms = function checkEnoughQuantityRooms(query, data) {
  var res;
  return regeneratorRuntime.async(function checkEnoughQuantityRooms$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.post)("roomtypes/".concat(query), data));

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

exports.checkEnoughQuantityRooms = checkEnoughQuantityRooms;

var getRoomTypeById = function getRoomTypeById(id) {
  var res;
  return regeneratorRuntime.async(function getRoomTypeById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("roomtypes/".concat(id)));

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

exports.getRoomTypeById = getRoomTypeById;

var holdRooms = function holdRooms(data) {
  var res;
  return regeneratorRuntime.async(function holdRooms$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.post)("roomtypes/hold-rooms", data));

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

exports.holdRooms = holdRooms;

var checkBookingRooms = function checkBookingRooms(data) {
  var res;
  return regeneratorRuntime.async(function checkBookingRooms$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.post)("roomtypes/check-bookrooms", data));

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

exports.checkBookingRooms = checkBookingRooms;