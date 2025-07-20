"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVehicle = exports.updateVehicle = exports.getVehiclesById = exports.getSearchVehicles = exports.getAllVehiclesByFilter = exports.getAllCarStatus = exports.getAllCarTypes = exports.checkBookingVehicle = exports.cancelVehicle = exports.holdVehicle = exports.getAllVehicles = void 0;

var _requestBookingService = require("../../utils/requestBookingService");

var _getAuthorization = require("../getAuthorization");

var getAllVehicles = function getAllVehicles(data) {
  var result;
  return regeneratorRuntime.async(function getAllVehicles$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("bookings/api/vehicles", data));

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
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("bookings/api/vehicles/hold", data));

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
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("bookings/api/vehicles/cancel", data));

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
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("bookings/api/vehicles/check", data));

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

var getAllCarTypes = function getAllCarTypes() {
  var result;
  return regeneratorRuntime.async(function getAllCarTypes$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/vehicles/all-cartypes"));

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

exports.getAllCarTypes = getAllCarTypes;

var getAllCarStatus = function getAllCarStatus() {
  var result;
  return regeneratorRuntime.async(function getAllCarStatus$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/vehicles/all-car-status"));

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

exports.getAllCarStatus = getAllCarStatus;

var getAllVehiclesByFilter = function getAllVehiclesByFilter(data) {
  var result;
  return regeneratorRuntime.async(function getAllVehiclesByFilter$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("bookings/api/vehicles/filter", data));

        case 2:
          result = _context7.sent;
          return _context7.abrupt("return", result);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.getAllVehiclesByFilter = getAllVehiclesByFilter;

var getSearchVehicles = function getSearchVehicles(keyword, pageNo, pageSize) {
  var result;
  return regeneratorRuntime.async(function getSearchVehicles$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/vehicles/search?keyword=".concat(keyword, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize)));

        case 2:
          result = _context8.sent;
          return _context8.abrupt("return", result);

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.getSearchVehicles = getSearchVehicles;

var getVehiclesById = function getVehiclesById(id) {
  var result;
  return regeneratorRuntime.async(function getVehiclesById$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("bookings/api/vehicles/".concat(id)));

        case 2:
          result = _context9.sent;
          return _context9.abrupt("return", result);

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
};

exports.getVehiclesById = getVehiclesById;

var updateVehicle = function updateVehicle(id, data) {
  var result;
  return regeneratorRuntime.async(function updateVehicle$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postImagesAuthorization)("bookings/api/vehicles/update/".concat(id), data));

        case 2:
          result = _context10.sent;
          return _context10.abrupt("return", result);

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
};

exports.updateVehicle = updateVehicle;

var createVehicle = function createVehicle(data) {
  var result;
  return regeneratorRuntime.async(function createVehicle$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postImagesAuthorization)("bookings/api/vehicles/create", data));

        case 2:
          result = _context11.sent;
          return _context11.abrupt("return", result);

        case 4:
        case "end":
          return _context11.stop();
      }
    }
  });
};

exports.createVehicle = createVehicle;