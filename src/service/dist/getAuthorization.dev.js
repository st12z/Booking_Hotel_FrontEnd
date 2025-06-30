"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAuthorization = exports.postImagesAuthorization = exports.postAuthorization = exports.getAuthorizationBlob = exports.getFileAuthorization = exports.getAuthorization = void 0;
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

var getFileAuthorization = function getFileAuthorization(path) {
  var response, result;
  return regeneratorRuntime.async(function getFileAuthorization$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(API_DOMAIN, "/").concat(path), {
            method: "GET",
            headers: {
              Authorization: "Bearer ".concat(localStorage.getItem("access_token"))
            }
          }));

        case 2:
          response = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(response.blob());

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

exports.getFileAuthorization = getFileAuthorization;

var getAuthorizationBlob = function getAuthorizationBlob(path) {
  var response, result;
  return regeneratorRuntime.async(function getAuthorizationBlob$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(API_DOMAIN, "/").concat(path), {
            method: "GET",
            headers: {
              Authorization: "Bearer ".concat(localStorage.getItem("access_token"))
            }
          }));

        case 2:
          response = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(response.blob());

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

exports.getAuthorizationBlob = getAuthorizationBlob;

var postAuthorization = function postAuthorization(path, data) {
  var response, result;
  return regeneratorRuntime.async(function postAuthorization$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(API_DOMAIN, "/").concat(path), {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer ".concat(localStorage.getItem("access_token"))
            },
            body: JSON.stringify(data)
          }));

        case 2:
          response = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          result = _context4.sent;
          return _context4.abrupt("return", result);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.postAuthorization = postAuthorization;

var postImagesAuthorization = function postImagesAuthorization(path, data) {
  var response, result;
  return regeneratorRuntime.async(function postImagesAuthorization$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(API_DOMAIN, "/").concat(path), {
            method: "POST",
            headers: {
              Authorization: "Bearer ".concat(localStorage.getItem("access_token"))
            },
            body: data
          }));

        case 2:
          response = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          result = _context5.sent;
          return _context5.abrupt("return", result);

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.postImagesAuthorization = postImagesAuthorization;

var deleteAuthorization = function deleteAuthorization(path, data) {
  var response, result;
  return regeneratorRuntime.async(function deleteAuthorization$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(API_DOMAIN, "/").concat(path), {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer ".concat(localStorage.getItem("access_token"))
            },
            body: JSON.stringify(data)
          }));

        case 2:
          response = _context6.sent;
          _context6.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          result = _context6.sent;
          return _context6.abrupt("return", result);

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.deleteAuthorization = deleteAuthorization;