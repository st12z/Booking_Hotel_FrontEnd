"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllMessagesByRoomChatId = exports.getChatsByRoomChatId = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var _getAuthorization = require("../getAuthorization");

var getChatsByRoomChatId = function getChatsByRoomChatId(roomChatId) {
  var res;
  return regeneratorRuntime.async(function getChatsByRoomChatId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/chats/messages/".concat(roomChatId)));

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

exports.getChatsByRoomChatId = getChatsByRoomChatId;

var getAllMessagesByRoomChatId = function getAllMessagesByRoomChatId(roomChatId, userId, pageNo, pageSize) {
  var query, res;
  return regeneratorRuntime.async(function getAllMessagesByRoomChatId$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          query = userId ? "rooms/api/chats/messages-page/".concat(roomChatId, "\n    ?userId=").concat(userId, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize) : "rooms/api/chats/messages-page/".concat(roomChatId, "\n    ?pageNo=").concat(pageNo, "&pageSize=").concat(pageSize);
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)(query));

        case 3:
          res = _context2.sent;
          return _context2.abrupt("return", res);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getAllMessagesByRoomChatId = getAllMessagesByRoomChatId;