"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postImagesAuthorization = exports.postAuthorization = exports.getAuthorization = void 0;
var API_DOMAIN = "http://localhost:8072/bookinghotel";

var getAuthorization = function getAuthorization(path) {
  var response, result;
  return regeneratorRuntime.async(function getAuthorization$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(API_DOMAIN, "/").concat(path), {
            method: "GET",
            headers: {
              Authorization: "Bearer ".concat(localStorage.getItem("access_token"))
            }
          }));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          result = _context.sent;
          return _context.abrupt("return", result);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAuthorization = getAuthorization;

var postAuthorization = function postAuthorization(path, data) {
  var response, result;
  return regeneratorRuntime.async(function postAuthorization$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(API_DOMAIN, "/").concat(path), {
            method: "POST",
            headers: {
              Authorization: "Bearer ".concat(localStorage.getItem("access_token"))
            },
            body: JSON.stringify(data)
          }));

        case 2:
          response = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          result = _context2.sent;
          return _context2.abrupt("return", result);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.postAuthorization = postAuthorization;

var postImagesAuthorization = function postImagesAuthorization(path, data) {
  var response, result;
  return regeneratorRuntime.async(function postImagesAuthorization$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(API_DOMAIN, "/").concat(path), {
            method: "POST",
            headers: {
              Authorization: "Bearer ".concat(localStorage.getItem("access_token"))
            },
            body: data
          }));

        case 2:
          response = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          result = _context3.sent;
          return _context3.abrupt("return", result);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.postImagesAuthorization = postImagesAuthorization;