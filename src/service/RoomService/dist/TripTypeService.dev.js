"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTripType = exports.updateTripType = exports.getTripTypeById = exports.getAllTripTypesByPage = exports.getAllTripTypes = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var _getAuthorization = require("../getAuthorization");

var getAllTripTypes = function getAllTripTypes(trip) {
  var result;
  return regeneratorRuntime.async(function getAllTripTypes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("triptypes"));

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

exports.getAllTripTypes = getAllTripTypes;

var getAllTripTypesByPage = function getAllTripTypesByPage(keyword, pageNo, pageSize) {
  var result;
  return regeneratorRuntime.async(function getAllTripTypesByPage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("triptypes/search?keyword=".concat(keyword, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize)));

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

exports.getAllTripTypesByPage = getAllTripTypesByPage;

var getTripTypeById = function getTripTypeById(id) {
  var result;
  return regeneratorRuntime.async(function getTripTypeById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("triptypes/".concat(id)));

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

exports.getTripTypeById = getTripTypeById;

var updateTripType = function updateTripType(id, data) {
  var result;
  return regeneratorRuntime.async(function updateTripType$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postImagesAuthorization)("rooms/api/triptypes/update/".concat(id), data));

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

exports.updateTripType = updateTripType;

var createTripType = function createTripType(data) {
  var result;
  return regeneratorRuntime.async(function createTripType$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postImagesAuthorization)("rooms/api/triptypes/create", data));

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

exports.createTripType = createTripType;