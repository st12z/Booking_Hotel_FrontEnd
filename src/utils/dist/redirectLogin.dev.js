"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlRedirectLogin = void 0;
var urlRedirectLogin = "\nhttp://localhost:7080/realms/master/protocol/openid-connect/auth?\nclient_id=booking-hotel\n&redirect_uri=http://localhost:3000/callback\n&state=a2678f5d-ab8f-4c55-bf5a-38c872fcc1fe\n&response_mode=query\n&response_type=code\n&scope=openid";
exports.urlRedirectLogin = urlRedirectLogin;