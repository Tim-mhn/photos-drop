import { auth } from 'express-oauth2-jwt-bearer';

export const isAuthMiddleware = auth({
  audience: 'https://photos-drop-api.com',
  issuerBaseURL: 'https://dev-jajajfbc.us.auth0.com/',
  tokenSigningAlg: 'RS256',
});
