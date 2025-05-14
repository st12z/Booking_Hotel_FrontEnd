"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = exports.del = exports.postImages = exports.post = exports.get = exports.getApiProtected = exports.API_DOMAIN = void 0;

var _AuthService = require("../service/UserService/AuthService");

var API_DOMAIN = "http://localhost:8072/bookinghotel/rooms/api";
exports.API_DOMAIN = API_DOMAIN;

var getApiProtected = function getApiProtected(path) {
  var response, result, resRefreshToken, resGetAccessToken, newResult;
  return regeneratorRuntime.async(function getApiProtected$(_context) {
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
          console.log(result);

          if (!(result.code == 401)) {
            _context.next = 23;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap((0, _AuthService.getAccessTokenByRefreshToken)("refresh-token"));

        case 10:
          resRefreshToken = _context.sent;

          if (!(resRefreshToken.status == 200)) {
            _context.next = 22;
            break;
          }

          localStorage.setItem("access_token", resRefreshToken.data.access_token);
          _context.next = 15;
          return regeneratorRuntime.awrap(fetch("".concat(API_DOMAIN, "/").concat(path), {
            method: "GET",
            headers: {
              Authorization: "Bearer ".concat(localStorage.getItem("access_token"))
            }
          }));

        case 15:
          resGetAccessToken = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(resGetAccessToken.json());

        case 18:
          newResult = _context.sent;
          return _context.abrupt("return", newResult);

        case 22:
          throw new Error({
            code: 401,
            message: "Phiên đăng nhập hết hạn.Vui lòng đăng nhập lại!"
          });

        case 23:
          return _context.abrupt("return", result);

        case 24:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getApiProtected = getApiProtected;

var get = function get(path) {
  var response, result;
  return regeneratorRuntime.async(function get$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(API_DOMAIN, "/").concat(path)));

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
          return regeneratorRuntime.awrap(fetch("".concat(API_DOMAIN, "/").concat(path), {
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

var postImages = function postImages(path, data) {
  var response, result;
  return regeneratorRuntime.async(function postImages$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(fetch("".concat(API_DOMAIN, "/").concat(path), {
            method: "POST",
            headers: {
              Accept: "application/json"
            },
            body: data
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

exports.postImages = postImages;

var del = function del(path) {
  var access_token, response, result;
  return regeneratorRuntime.async(function del$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          access_token = localStorage.getItem("access_token");
          _context5.next = 3;
          return regeneratorRuntime.awrap(fetch("".concat(API_DOMAIN, "/").concat(path), {
            method: "DELETE",
            headers: {
              Authorization: "Bearer ".concat(access_token)
            },
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

exports.del = del;

var patch = function patch(path, data) {
  var access_token, response, result;
  return regeneratorRuntime.async(function patch$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          access_token = localStorage.getItem("access_token");
          _context6.next = 3;
          return regeneratorRuntime.awrap(fetch("".concat(API_DOMAIN, "/").concat(path), {
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
          response = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          result = _context6.sent;
          return _context6.abrupt("return", result);

        case 8:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.patch = patch;