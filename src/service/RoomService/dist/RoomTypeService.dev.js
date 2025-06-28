"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRoomType = exports.updateFreeServicesOfRoomType = exports.createRoomType = exports.checkBookingRooms = exports.holdRooms = exports.getRoomTypeById = exports.checkEnoughQuantityRooms = exports.getRoomTypesBySearchRequest = exports.getRoomTypesBySlugProperty = exports.getAllRoomTypes = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var _getAuthorization = require("../getAuthorization");

var getAllRoomTypes = function getAllRoomTypes() {
  var result;
  return regeneratorRuntime.async(function getAllRoomTypes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/roomtypes/all"));

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

exports.getAllRoomTypes = getAllRoomTypes;

var getRoomTypesBySlugProperty = function getRoomTypesBySlugProperty(query) {
  var result;
  return regeneratorRuntime.async(function getRoomTypesBySlugProperty$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/roomtypes?".concat(query)));

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

exports.getRoomTypesBySlugProperty = getRoomTypesBySlugProperty;

var getRoomTypesBySearchRequest = function getRoomTypesBySearchRequest(query, data) {
  var result;
  return regeneratorRuntime.async(function getRoomTypesBySearchRequest$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("rooms/api/roomtypes?".concat(query), data));

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

exports.getRoomTypesBySearchRequest = getRoomTypesBySearchRequest;

var checkEnoughQuantityRooms = function checkEnoughQuantityRooms(query, data) {
  var res;
  return regeneratorRuntime.async(function checkEnoughQuantityRooms$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("rooms/api/roomtypes/".concat(query), data));

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

exports.checkEnoughQuantityRooms = checkEnoughQuantityRooms;

var getRoomTypeById = function getRoomTypeById(id) {
  var res;
  return regeneratorRuntime.async(function getRoomTypeById$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/roomtypes/".concat(id)));

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

exports.getRoomTypeById = getRoomTypeById;

var holdRooms = function holdRooms(data) {
  var res;
  return regeneratorRuntime.async(function holdRooms$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("rooms/api/roomtypes/hold-rooms", data));

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

exports.holdRooms = holdRooms;

var checkBookingRooms = function checkBookingRooms(data) {
  var res;
  return regeneratorRuntime.async(function checkBookingRooms$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("rooms/api/roomtypes/check-bookrooms", data));

        case 2:
          res = _context7.sent;
          return _context7.abrupt("return", res);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.checkBookingRooms = checkBookingRooms;

var createRoomType = function createRoomType(data) {
  var res;
  return regeneratorRuntime.async(function createRoomType$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("rooms/api/roomtypes/create", data));

        case 2:
          res = _context8.sent;
          return _context8.abrupt("return", res);

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.createRoomType = createRoomType;

var updateFreeServicesOfRoomType = function updateFreeServicesOfRoomType(data) {
  var res;
  return regeneratorRuntime.async(function updateFreeServicesOfRoomType$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("rooms/api/roomtypes/update-free-services", data));

        case 2:
          res = _context9.sent;
          return _context9.abrupt("return", res);

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
};

exports.updateFreeServicesOfRoomType = updateFreeServicesOfRoomType;

var updateRoomType = function updateRoomType(id, data) {
  var res;
  return regeneratorRuntime.async(function updateRoomType$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("rooms/api/roomtypes/update/".concat(id), data));

        case 2:
          res = _context10.sent;
          return _context10.abrupt("return", res);

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
};

exports.updateRoomType = updateRoomType;