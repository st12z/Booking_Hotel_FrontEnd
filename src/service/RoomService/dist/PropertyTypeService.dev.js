"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPropertyType = exports.updatePropertyType = exports.getPropertyTypeById = exports.getAllPropertyTypesPage = exports.getAllPropertyTypes = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var _getAuthorization = require("../getAuthorization");

var getAllPropertyTypes = function getAllPropertyTypes() {
  var res;
  return regeneratorRuntime.async(function getAllPropertyTypes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res = (0, _getAuthorization.getAuthorization)("rooms/api/property-types");
          return _context.abrupt("return", res);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAllPropertyTypes = getAllPropertyTypes;

var getAllPropertyTypesPage = function getAllPropertyTypesPage(keyword, pageNo, pageSize) {
  var res;
  return regeneratorRuntime.async(function getAllPropertyTypesPage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res = (0, _getAuthorization.getAuthorization)("rooms/api/property-types/search?keyword=".concat(keyword, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize));
          return _context2.abrupt("return", res);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getAllPropertyTypesPage = getAllPropertyTypesPage;

var getPropertyTypeById = function getPropertyTypeById(id) {
  var res;
  return regeneratorRuntime.async(function getPropertyTypeById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res = (0, _getAuthorization.getAuthorization)("rooms/api/property-types/".concat(id));
          return _context3.abrupt("return", res);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getPropertyTypeById = getPropertyTypeById;

var updatePropertyType = function updatePropertyType(id, data) {
  var res;
  return regeneratorRuntime.async(function updatePropertyType$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res = (0, _getAuthorization.postAuthorization)("rooms/api/property-types/update/".concat(id), data);
          return _context4.abrupt("return", res);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.updatePropertyType = updatePropertyType;

var createPropertyType = function createPropertyType(data) {
  var res;
  return regeneratorRuntime.async(function createPropertyType$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res = (0, _getAuthorization.postAuthorization)("rooms/api/property-types/create", data);
          return _context5.abrupt("return", res);

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.createPropertyType = createPropertyType;