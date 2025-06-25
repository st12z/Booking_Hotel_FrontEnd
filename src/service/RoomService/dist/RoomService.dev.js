"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRoom = exports.getQuantityRooms = exports.createRoom = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var _getAuthorization = require("../getAuthorization");

var createRoom = function createRoom(data) {
  var res;
  return regeneratorRuntime.async(function createRoom$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("rooms/api/rooms/create", data));

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

exports.createRoom = createRoom;

var getQuantityRooms = function getQuantityRooms(propertyId, roomTypeId) {
  var res;
  return regeneratorRuntime.async(function getQuantityRooms$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("rooms/quantity-rooms?propertyId=".concat(propertyId, "&roomTypeId=").concat(roomTypeId)));

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

exports.getQuantityRooms = getQuantityRooms;

var deleteRoom = function deleteRoom(id) {
  var res;
  return regeneratorRuntime.async(function deleteRoom$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.deleteAuthorization)("rooms/api/rooms/delete/".concat(id)));

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

exports.deleteRoom = deleteRoom;