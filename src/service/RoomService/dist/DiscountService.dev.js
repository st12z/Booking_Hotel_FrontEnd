"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDiscountHotel = exports.updatDiscountHotel = exports.getDiscountHotelById = exports.getSearchDiscounts = exports.getAllDiscountsByPage = exports.getAllDiscountType = exports.getDiscountHotelsByUserPage = exports.getDiscountHotelsByUser = exports.saveDiscount = exports.getAllDiscounts = void 0;

var _requestRoomService = require("../../utils/requestRoomService");

var _getAuthorization = require("../getAuthorization");

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
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("rooms/api/discounts/save", id));

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

var getDiscountHotelsByUser = function getDiscountHotelsByUser() {
  var result;
  return regeneratorRuntime.async(function getDiscountHotelsByUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/discounts/my-discounts"));

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

var getDiscountHotelsByUserPage = function getDiscountHotelsByUserPage(pageNo, pageSize) {
  var result;
  return regeneratorRuntime.async(function getDiscountHotelsByUserPage$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/discounts/my-discounts-page?pageNo=".concat(pageNo, "&pageSize=").concat(pageSize)));

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

exports.getDiscountHotelsByUserPage = getDiscountHotelsByUserPage;

var getAllDiscountType = function getAllDiscountType() {
  var result;
  return regeneratorRuntime.async(function getAllDiscountType$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/discounts/discount-types"));

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

exports.getAllDiscountType = getAllDiscountType;

var getAllDiscountsByPage = function getAllDiscountsByPage(filter) {
  var result;
  return regeneratorRuntime.async(function getAllDiscountsByPage$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("rooms/api/discounts/filter", filter));

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

exports.getAllDiscountsByPage = getAllDiscountsByPage;

var getSearchDiscounts = function getSearchDiscounts(keyword, pageNo, pageSize) {
  var result;
  return regeneratorRuntime.async(function getSearchDiscounts$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/discounts/search?keyword=".concat(keyword, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize)));

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

exports.getSearchDiscounts = getSearchDiscounts;

var getDiscountHotelById = function getDiscountHotelById(id) {
  var result;
  return regeneratorRuntime.async(function getDiscountHotelById$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/discounts/".concat(id)));

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

exports.getDiscountHotelById = getDiscountHotelById;

var updatDiscountHotel = function updatDiscountHotel(id, data) {
  var result;
  return regeneratorRuntime.async(function updatDiscountHotel$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postImagesAuthorization)("rooms/api/discounts/update/".concat(id), data));

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

exports.updatDiscountHotel = updatDiscountHotel;

var createDiscountHotel = function createDiscountHotel(data) {
  var result;
  return regeneratorRuntime.async(function createDiscountHotel$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postImagesAuthorization)("rooms/api/discounts/create", data));

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

exports.createDiscountHotel = createDiscountHotel;