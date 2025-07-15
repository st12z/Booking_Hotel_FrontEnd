"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCity = exports.updateCity = exports.getCityById = exports.getCitiesByKeyword = exports.getAllCitiesByPage = exports.getAllCities = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var _getAuthorization = require("../getAuthorization");

var getAllCities = function getAllCities() {
  var result;
  return regeneratorRuntime.async(function getAllCities$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("cities"));

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

exports.getAllCities = getAllCities;

var getAllCitiesByPage = function getAllCitiesByPage(pageNo, pageSize) {
  var result;
  return regeneratorRuntime.async(function getAllCitiesByPage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("cities/city-page?pageNo=".concat(pageNo, "&pageSize=").concat(pageSize)));

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

exports.getAllCitiesByPage = getAllCitiesByPage;

var getCitiesByKeyword = function getCitiesByKeyword(keyword, pageNo, pageSize) {
  var result;
  return regeneratorRuntime.async(function getCitiesByKeyword$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("cities/search?keyword=".concat(keyword, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize)));

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

exports.getCitiesByKeyword = getCitiesByKeyword;

var getCityById = function getCityById(id) {
  var result;
  return regeneratorRuntime.async(function getCityById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("cities/".concat(id)));

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

exports.getCityById = getCityById;

var updateCity = function updateCity(id, data) {
  var result;
  return regeneratorRuntime.async(function updateCity$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postImagesAuthorization)("rooms/api/cities/update/".concat(id), data));

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

exports.updateCity = updateCity;

var createCity = function createCity(data) {
  var result;
  return regeneratorRuntime.async(function createCity$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postImagesAuthorization)("rooms/api/cities/create", data));

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

exports.createCity = createCity;