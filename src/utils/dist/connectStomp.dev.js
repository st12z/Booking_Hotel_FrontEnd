"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectStomp = void 0;

var _stompjs = require("@stomp/stompjs");

var _sockjsClient = _interopRequireDefault(require("sockjs-client"));

var _variable = require("./variable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectStomp = function connectStomp(url, data) {
  var socket = new _sockjsClient["default"]("".concat(_variable.API_DOMAIN_SOCKET, "/ws"));

  var client = _stompjs.Stomp.over(socket);

  client.connect({}, function () {
    console.log("Đã kết nối tới STOMP");
    client.send("".concat(url), {}, JSON.stringify(data));
  });
  return function () {
    if (client && client.connected) {
      client.disconnect(function () {
        console.log("Đã ngắt kết nối");
      });
    }
  };
};

exports.connectStomp = connectStomp;