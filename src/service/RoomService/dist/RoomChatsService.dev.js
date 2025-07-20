"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRoomChats = exports.getAllRoomChats = exports.getRoomChatsId = exports.getRoomChatsOfUser = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var _getAuthorization = require("../getAuthorization");

var getRoomChatsOfUser = function getRoomChatsOfUser(userId) {
  var res;
  return regeneratorRuntime.async(function getRoomChatsOfUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/room-chats/rooms/".concat(userId)));

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

exports.getRoomChatsOfUser = getRoomChatsOfUser;

var getRoomChatsId = function getRoomChatsId(id) {
  var res;
  return regeneratorRuntime.async(function getRoomChatsId$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/room-chats/".concat(id)));

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

exports.getRoomChatsId = getRoomChatsId;

var getAllRoomChats = function getAllRoomChats(keyword, pageNo, pageSize) {
  var res;
  return regeneratorRuntime.async(function getAllRoomChats$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/room-chats/all?keyword=".concat(keyword, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize)));

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

exports.getAllRoomChats = getAllRoomChats;

var updateRoomChats = function updateRoomChats(data) {
  var res;
  return regeneratorRuntime.async(function updateRoomChats$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("rooms/api/room-chats/update", data));

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

exports.updateRoomChats = updateRoomChats;