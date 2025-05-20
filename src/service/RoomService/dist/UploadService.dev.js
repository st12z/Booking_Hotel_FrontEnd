"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImages = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var _getAuthorization = require("../getAuthorization");

var uploadImages = function uploadImages(data) {
  var res;
  return regeneratorRuntime.async(function uploadImages$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postImagesAuthorization)("rooms/api/upload", data));

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

exports.uploadImages = uploadImages;