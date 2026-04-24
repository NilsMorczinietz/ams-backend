/**
 * Authenticated user data resolved from application database
 */
export interface AuthUser {
  id: string;
  keycloakId: string;
  name: string;
  email: string;
}

/**
 * Access token claims used by this application
 */
export interface TokenClaims {
  sub: string;
  name?: string;
  email?: string;
  preferred_username?: string;
  aud: string | string[];
  iss: string;
  iat: number;
  exp: number;
}

/**
 * JWT payload with application-relevant claims
 */
export interface JwtPayload extends TokenClaims {
  [key: string]: unknown;
}

/**
 * Request with authenticated user
 */
export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
  token?: JwtPayload;
}
