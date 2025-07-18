"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDiscountCar = exports.updateDiscountCars = exports.getDiscountCarById = exports.getAllDiscountCarsByPage = exports.getSearchDiscountCars = exports.getDiscountCarByUserPage = exports.saveDiscountCar = exports.getDiscountCarsByUser = exports.getAllDiscountCars = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var _getAuthorization = require("../getAuthorization");

var getAllDiscountCars = function getAllDiscountCars() {
  var result;
  return regeneratorRuntime.async(function getAllDiscountCars$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("discount-cars"));

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

exports.getAllDiscountCars = getAllDiscountCars;

var getDiscountCarsByUser = function getDiscountCarsByUser() {
  var result;
  return regeneratorRuntime.async(function getDiscountCarsByUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/discount-cars/my-discounts"));

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

exports.getDiscountCarsByUser = getDiscountCarsByUser;

var saveDiscountCar = function saveDiscountCar(id) {
  var result;
  return regeneratorRuntime.async(function saveDiscountCar$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("rooms/api/discount-cars/save-discount", id));

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

exports.saveDiscountCar = saveDiscountCar;

var getDiscountCarByUserPage = function getDiscountCarByUserPage(pageNo, pageSize) {
  var result;
  return regeneratorRuntime.async(function getDiscountCarByUserPage$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/discount-cars/my-discounts-page?pageNo=".concat(pageNo, "&pageSize=").concat(pageSize)));

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

exports.getDiscountCarByUserPage = getDiscountCarByUserPage;

var getSearchDiscountCars = function getSearchDiscountCars(keyword, pageNo, pageSize) {
  var result;
  return regeneratorRuntime.async(function getSearchDiscountCars$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/discount-cars/search?keyword=".concat(keyword, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize)));

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

exports.getSearchDiscountCars = getSearchDiscountCars;

var getAllDiscountCarsByPage = function getAllDiscountCarsByPage(filter) {
  var result;
  return regeneratorRuntime.async(function getAllDiscountCarsByPage$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("rooms/api/discount-cars/filter", filter));

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

exports.getAllDiscountCarsByPage = getAllDiscountCarsByPage;

var getDiscountCarById = function getDiscountCarById(id) {
  var result;
  return regeneratorRuntime.async(function getDiscountCarById$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/discount-cars/".concat(id)));

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

exports.getDiscountCarById = getDiscountCarById;

var updateDiscountCars = function updateDiscountCars(id, data) {
  var result;
  return regeneratorRuntime.async(function updateDiscountCars$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postImagesAuthorization)("rooms/api/discount-cars/update/".concat(id), data));

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

exports.updateDiscountCars = updateDiscountCars;

var createDiscountCar = function createDiscountCar(data) {
  var result;
  return regeneratorRuntime.async(function createDiscountCar$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postImagesAuthorization)("rooms/api/discount-cars/create", data));

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

exports.createDiscountCar = createDiscountCar;