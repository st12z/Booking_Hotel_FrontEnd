"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = exports.del = exports.post = exports.get = exports.getCredentials = void 0;

var _variable = require("./variable");

var getCredentials = function getCredentials(path) {
  var response, result;
  return regeneratorRuntime.async(function getCredentials$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(_variable.API_DOMAIN_USERS, "/").concat(path), {
            method: "GET",
            credentials: "include"
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

exports.getCredentials = getCredentials;

var get = function get(path) {
  var response, result;
  return regeneratorRuntime.async(function get$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(_variable.API_DOMAIN_USERS, "/").concat(path)));

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

exports.get = get;

var post = function post(path, data) {
  var response, result;
  return regeneratorRuntime.async(function post$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(_variable.API_DOMAIN_USERS, "/").concat(path), {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
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

exports.post = post;

var del = function del(path) {
  var access_token, response, result;
  return regeneratorRuntime.async(function del$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          access_token = localStorage.getItem("access_token");
          _context4.next = 3;
          return regeneratorRuntime.awrap(fetch("".concat(_variable.API_DOMAIN_USERS, "/").concat(path), {
            method: "DELETE",
            headers: {
              Authorization: "Bearer ".concat(access_token)
            },
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

exports.del = del;

var patch = function patch(path, data) {
  var access_token, response, result;
  return regeneratorRuntime.async(function patch$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          access_token = localStorage.getItem("access_token");
          _context5.next = 3;
          return regeneratorRuntime.awrap(fetch("".concat(_variable.API_DOMAIN_USERS, "/").concat(path), {
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
          response = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          result = _context5.sent;
          return _context5.abrupt("return", result);

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.patch = patch;