"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChatsByRoomChatId = exports.getRoomChatsOfUser = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var getRoomChatsOfUser = function getRoomChatsOfUser(userId) {
  var res;
  return regeneratorRuntime.async(function getRoomChatsOfUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("chats/rooms/".concat(userId)));

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

var getChatsByRoomChatId = function getChatsByRoomChatId(roomChatId) {
  var res;
  return regeneratorRuntime.async(function getChatsByRoomChatId$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("chats/messages/".concat(roomChatId)));

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

exports.getChatsByRoomChatId = getChatsByRoomChatId;