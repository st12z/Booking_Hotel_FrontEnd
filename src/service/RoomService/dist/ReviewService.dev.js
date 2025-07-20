"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearchReviews = exports.getAllReviews = exports.getAmountReviews = exports.getReviewsByPropertyId = exports.deleteReview = exports.createReview = void 0;

var _getAuthorization = require("../getAuthorization");

var createReview = function createReview(data) {
  var res;
  return regeneratorRuntime.async(function createReview$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postImagesAuthorization)("rooms/api/reviews", data));

        case 2:
          res = _context.sent;
          return _context.abrupt("return", res);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.createReview = createReview;

var deleteReview = function deleteReview(id) {
  var res;
  return regeneratorRuntime.async(function deleteReview$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/reviews/delete/".concat(id)));

        case 2:
          res = _context2.sent;
          return _context2.abrupt("return", res);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.deleteReview = deleteReview;

var getReviewsByPropertyId = function getReviewsByPropertyId(propertyId) {
  var res;
  return regeneratorRuntime.async(function getReviewsByPropertyId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/reviews?propertyId=".concat(propertyId)));

        case 2:
          res = _context3.sent;
          return _context3.abrupt("return", res);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getReviewsByPropertyId = getReviewsByPropertyId;

var getAmountReviews = function getAmountReviews() {
  var result;
  return regeneratorRuntime.async(function getAmountReviews$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/reviews/amount-reviews"));

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

exports.getAmountReviews = getAmountReviews;

var getAllReviews = function getAllReviews(filter) {
  var result;
  return regeneratorRuntime.async(function getAllReviews$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("rooms/api/reviews/filter", filter));

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

exports.getAllReviews = getAllReviews;

var getSearchReviews = function getSearchReviews(keyword, pageNo, pageSize) {
  var result;
  return regeneratorRuntime.async(function getSearchReviews$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("rooms/api/reviews/search?keyword=".concat(keyword, "&pageNo=").concat(pageNo, "&pageSize=").concat(pageSize)));

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

exports.getSearchReviews = getSearchReviews;