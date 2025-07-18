"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFacility = exports.updateFacility = exports.getFacilityById = exports.getAllFacilitiesByPage = exports.getFacilities = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var _getAuthorization = require("../getAuthorization");

var getFacilities = function getFacilities() {
  var result;
  return regeneratorRuntime.async(function getFacilities$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          result = (0, _requestRoomService.get)("facilities");
          return _context.abrupt("return", result);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getFacilities = getFacilities;

var getAllFacilitiesByPage = function getAllFacilitiesByPage(keyword, pageNo, pageSize) {
  var result;
  return regeneratorRuntime.async(function getAllFacilitiesByPage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          result = (0, _requestRoomService.get)("facilities/search?keyword=".concat(keyword, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize));
          return _context2.abrupt("return", result);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getAllFacilitiesByPage = getAllFacilitiesByPage;

var getFacilityById = function getFacilityById(id) {
  var result;
  return regeneratorRuntime.async(function getFacilityById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          result = (0, _requestRoomService.get)("facilities/".concat(id));
          return _context3.abrupt("return", result);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getFacilityById = getFacilityById;

var updateFacility = function updateFacility(id, data) {
  var result;
  return regeneratorRuntime.async(function updateFacility$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          result = (0, _getAuthorization.postAuthorization)("rooms/api/facilities/update/".concat(id), data);
          return _context4.abrupt("return", result);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.updateFacility = updateFacility;

var createFacility = function createFacility(data) {
  var result;
  return regeneratorRuntime.async(function createFacility$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          result = (0, _getAuthorization.postAuthorization)("rooms/api/facilities/create", data);
          return _context5.abrupt("return", result);

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.createFacility = createFacility;