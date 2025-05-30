"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChatsByRoomChatId = void 0;

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