"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTokenExpired = void 0;

var _jwtDecode2 = require("jwt-decode");

var isTokenExpired = function isTokenExpired(token) {
  try {
    var _jwtDecode = (0, _jwtDecode2.jwtDecode)(token),
        exp = _jwtDecode.exp;

    return Date.now() >= exp * 1000;
  } catch (e) {
    return true;
  }
};

exports.isTokenExpired = isTokenExpired;