"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlRedirectLogin = exports.API_DOMAIN_MESSAGES = exports.API_DOMAIN_PAYMENTS = exports.API_DOMAIN_ROOMS = exports.API_DOMAIN_BOOKINGS = exports.API_DOMAIN_USERS = exports.API_DOMAIN = exports.API_DOMAIN_SOCKET = void 0;
var API_DOMAIN_SOCKET = "https://rooms-s1.onrender.com";
exports.API_DOMAIN_SOCKET = API_DOMAIN_SOCKET;
var API_DOMAIN = "https://gatewayserver-s1.onrender.com/bookinghotel";
exports.API_DOMAIN = API_DOMAIN;
var API_DOMAIN_USERS = "https://gatewayserver-s1.onrender.com/bookinghotel/users/api/users";
exports.API_DOMAIN_USERS = API_DOMAIN_USERS;
var API_DOMAIN_BOOKINGS = "https://gatewayserver-s1.onrender.com/bookinghotel/bookings/api";
exports.API_DOMAIN_BOOKINGS = API_DOMAIN_BOOKINGS;
var API_DOMAIN_ROOMS = "https://gatewayserver-s1.onrender.com/bookinghotel/rooms/api";
exports.API_DOMAIN_ROOMS = API_DOMAIN_ROOMS;
var API_DOMAIN_PAYMENTS = "https://gatewayserver-s1.onrender.com/bookinghotel/payments/api";
exports.API_DOMAIN_PAYMENTS = API_DOMAIN_PAYMENTS;
var API_DOMAIN_MESSAGES = "https://gatewayserver-s1.onrender.com/bookinghotel/messages/api";
exports.API_DOMAIN_MESSAGES = API_DOMAIN_MESSAGES;
var urlRedirectLogin = "\nhttps://keycloak-s1.onrender.com/realms/master/protocol/openid-connect/auth?\nclient_id=booking-hotel\n&redirect_uri=https://booking-hotel-front-end.vercel.app/callback\n&state=a2678f5d-ab8f-4c55-bf5a-38c872fcc1fe\n&response_mode=query\n&response_type=code\n&scope=openid";
exports.urlRedirectLogin = urlRedirectLogin;