export const urlRedirectLogin = `
http://localhost:7080/realms/master/protocol/openid-connect/auth?
client_id=booking-hotel
&redirect_uri=http://localhost:3000/callback
&state=a2678f5d-ab8f-4c55-bf5a-38c872fcc1fe
&response_mode=query
&response_type=code
&scope=openid`;
