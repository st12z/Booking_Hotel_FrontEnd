"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = exports.del = exports.post = exports.get = void 0;

var _variable = require("./variable");

var get = function get(path) {
  var response, result;
  return regeneratorRuntime.async(function get$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(_variable.API_DOMAIN_PAYMENTS, "/").concat(path)));

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

exports.get = get;

var post = function post(path, data) {
  var response, result;
  return regeneratorRuntime.async(function post$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(_variable.API_DOMAIN_PAYMENTS, "/").concat(path), {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
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

exports.post = post;

var del = function del(path) {
  var access_token, response, result;
  return regeneratorRuntime.async(function del$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          access_token = localStorage.getItem("access_token");
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch("".concat(_variable.API_DOMAIN_PAYMENTS, "/").concat(path), {
            method: "DELETE",
            headers: {
              Authorization: "Bearer ".concat(access_token)
            },
            credentials: "include"
          }));

        case 3:
          response = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          result = _context3.sent;
          return _context3.abrupt("return", result);

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.del = del;

var patch = function patch(path, data) {
  var access_token, response, result;
  return regeneratorRuntime.async(function patch$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          access_token = localStorage.getItem("access_token");
          _context4.next = 3;
          return regeneratorRuntime.awrap(fetch("".concat(_variable.API_DOMAIN_PAYMENTS, "/").concat(path), {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer ".concat(access_token)
            },
            body: JSON.stringify(data),
            credentials: "include"
          }));

        case 3:
          response = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          result = _context4.sent;
          return _context4.abrupt("return", result);

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.patch = patch;