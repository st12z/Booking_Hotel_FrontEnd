export const API_DOMAIN_SOCKET = "https://rooms-s1.onrender.com";
export const API_DOMAIN = "https://gatewayserver-s1.onrender.com/bookinghotel";
export const API_DOMAIN_USERS =
  "https://gatewayserver-s1.onrender.com/bookinghotel/users/api/users";
export const API_DOMAIN_BOOKINGS =
  "https://gatewayserver-s1.onrender.com/bookinghotel/bookings/api";
export const API_DOMAIN_ROOMS =
  "https://gatewayserver-s1.onrender.com/bookinghotel/rooms/api";
export const API_DOMAIN_PAYMENTS =
  "https://gatewayserver-s1.onrender.com/bookinghotel/payments/api";
export const API_DOMAIN_MESSAGES =
  "https://gatewayserver-s1.onrender.com/bookinghotel/messages/api";
export const urlRedirectLogin = `
https://keycloak-s1.onrender.com/realms/master/protocol/openid-connect/auth?
client_id=booking-hotel
&redirect_uri=https://booking-hotel-front-end.vercel.app/callback
&state=a2678f5d-ab8f-4c55-bf5a-38c872fcc1fe
&response_mode=query
&response_type=code
&scope=openid`;
