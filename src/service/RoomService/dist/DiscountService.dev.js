"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDiscountCarsByUser = exports.getDiscountHotelsByUser = exports.saveDiscount = exports.getAllDiscounts = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var getAllDiscounts = function getAllDiscounts() {
  var result;
  return regeneratorRuntime.async(function getAllDiscounts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("discounts"));

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

exports.getAllDiscounts = getAllDiscounts;

var saveDiscount = function saveDiscount(id) {
  var result;
  return regeneratorRuntime.async(function saveDiscount$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.post)("discounts/save", id));

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

exports.saveDiscount = saveDiscount;

var getDiscountHotelsByUser = function getDiscountHotelsByUser(email) {
  var result;
  return regeneratorRuntime.async(function getDiscountHotelsByUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("discounts/my-discounts/".concat(email)));

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

exports.getDiscountHotelsByUser = getDiscountHotelsByUser;

var getDiscountCarsByUser = function getDiscountCarsByUser(email) {
  var result;
  return regeneratorRuntime.async(function getDiscountCarsByUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _requestRoomService.get)("discount-cars/my-discounts/".concat(email)));

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

exports.getDiscountCarsByUser = getDiscountCarsByUser;