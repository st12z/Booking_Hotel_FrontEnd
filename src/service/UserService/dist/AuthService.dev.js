"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoomChats = exports.getInfoUserById = exports.getInfoUser = exports.logout = exports.getAccessTokenByRefreshToken = exports.getAccessToken = exports.registerUser = void 0;

var _requestUserService = require("../../utils/requestUserService");

var registerUser = function registerUser(data) {
  var res;
  return regeneratorRuntime.async(function registerUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _requestUserService.post)("register", data));

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

exports.registerUser = registerUser;

var getAccessToken = function getAccessToken(query) {
  var res;
  return regeneratorRuntime.async(function getAccessToken$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _requestUserService.getCredentials)(query));

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

exports.getAccessToken = getAccessToken;

var getAccessTokenByRefreshToken = function getAccessTokenByRefreshToken(query) {
  var res;
  return regeneratorRuntime.async(function getAccessTokenByRefreshToken$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _requestUserService.getCredentials)(query));

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

exports.getAccessTokenByRefreshToken = getAccessTokenByRefreshToken;

var logout = function logout(query) {
  var res;
  return regeneratorRuntime.async(function logout$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _requestUserService.getCredentials)(query));

        case 2:
          res = _context4.sent;
          return _context4.abrupt("return", res);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.logout = logout;

var getInfoUser = function getInfoUser() {
  var result;
  return regeneratorRuntime.async(function getInfoUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap((0, _requestUserService.getAuthorization)("info-user"));

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

exports.getInfoUser = getInfoUser;

var getInfoUserById = function getInfoUserById(id) {
  var result;
  return regeneratorRuntime.async(function getInfoUserById$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _requestUserService.get)("get-user/".concat(id)));

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

exports.getInfoUserById = getInfoUserById;

var createRoomChats = function createRoomChats(data) {
  var result;
  return regeneratorRuntime.async(function createRoomChats$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap((0, _requestUserService.post)("create-rooms", data));

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

exports.createRoomChats = createRoomChats;