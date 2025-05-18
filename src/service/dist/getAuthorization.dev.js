"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthorization = void 0;
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