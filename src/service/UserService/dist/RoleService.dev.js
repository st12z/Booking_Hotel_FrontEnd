"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllRolesAdmin = exports.createRole = exports.getAllRoles = exports.getAllRolesByPage = void 0;

var _getAuthorization = require("../getAuthorization");

var getAllRolesByPage = function getAllRolesByPage(pageNo, pageSize) {
  var result;
  return regeneratorRuntime.async(function getAllRolesByPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("users/api/roles/all?pageNo=".concat(pageNo, "&pageSize=").concat(pageSize)));

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

exports.getAllRolesByPage = getAllRolesByPage;

var getAllRoles = function getAllRoles() {
  var result;
  return regeneratorRuntime.async(function getAllRoles$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("users/api/roles"));

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

exports.getAllRoles = getAllRoles;

var createRole = function createRole(data) {
  var result;
  return regeneratorRuntime.async(function createRole$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.postAuthorization)("users/api/roles/create", data));

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

exports.createRole = createRole;

var getAllRolesAdmin = function getAllRolesAdmin() {
  var result;
  return regeneratorRuntime.async(function getAllRolesAdmin$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _getAuthorization.getAuthorization)("users/api/roles/roles-admin"));

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

exports.getAllRolesAdmin = getAllRolesAdmin;