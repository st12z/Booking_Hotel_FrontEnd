"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkBookingVehicle = exports.cancelVehicle = exports.holdVehicle = exports.getAllVehicles = void 0;

var _requestBookingService = require("../../utils/requestBookingService");

var getAllVehicles = function getAllVehicles(data) {
  var result;
  return regeneratorRuntime.async(function getAllVehicles$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _requestBookingService.post)("vehicles", data));

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

exports.getAllVehicles = getAllVehicles;

var holdVehicle = function holdVehicle(data) {
  var result;
  return regeneratorRuntime.async(function holdVehicle$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestBookingService.post)("vehicles/hold", data));

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

exports.holdVehicle = holdVehicle;

var cancelVehicle = function cancelVehicle(data) {
  var result;
  return regeneratorRuntime.async(function cancelVehicle$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _requestBookingService.post)("vehicles/cancel", data));

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

exports.cancelVehicle = cancelVehicle;

var checkBookingVehicle = function checkBookingVehicle(data) {
  var result;
  return regeneratorRuntime.async(function checkBookingVehicle$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _requestBookingService.post)("vehicles/check", data));

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

exports.checkBookingVehicle = checkBookingVehicle;