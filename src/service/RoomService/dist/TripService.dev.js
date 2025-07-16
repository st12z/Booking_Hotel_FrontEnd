"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTrip = exports.updateTrip = exports.getTripById = exports.getAllTripsByPage = exports.getTripsByType = exports.getAllTrips = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var _getAuthorization = require("../getAuthorization");

var getAllTrips = function getAllTrips() {
  var result;
  return regeneratorRuntime.async(function getAllTrips$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("trips"));

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

exports.getAllTrips = getAllTrips;

var getTripsByType = function getTripsByType(tripType) {
  var result;
  return regeneratorRuntime.async(function getTripsByType$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("trips?trip=".concat(tripType)));

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

exports.getTripsByType = getTripsByType;

var getAllTripsByPage = function getAllTripsByPage(keyword, pageNo, pageSize) {
  var result;
  return regeneratorRuntime.async(function getAllTripsByPage$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("trips/trips-page?keyword=".concat(keyword, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize)));

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

exports.getAllTripsByPage = getAllTripsByPage;

var getTripById = function getTripById(tripId) {
  var result;
  return regeneratorRuntime.async(function getTripById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("trips/".concat(tripId)));

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

exports.getTripById = getTripById;

var updateTrip = function updateTrip(id, data) {
  var result;
  return regeneratorRuntime.async(function updateTrip$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postImagesAuthorization)("rooms/api/trips/update/".concat(id), data));

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

exports.updateTrip = updateTrip;

var createTrip = function createTrip(data) {
  var result;
  return regeneratorRuntime.async(function createTrip$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postImagesAuthorization)("rooms/api/trips/create", data));

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

exports.createTrip = createTrip;