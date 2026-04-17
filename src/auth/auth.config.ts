const keycloakUrl = process.env.KEYCLOAK_URL ?? 'http://localhost:8080';
const keycloakRealm = process.env.KEYCLOAK_REALM ?? 'fwmar-dev';

const issuer = `${keycloakUrl}/realms/${keycloakRealm}`;

export const keycloakConfig = {
  audience: process.env.KEYCLOAK_AUDIENCE ?? 'ams-backend',
  issuer,
  jwksUri: `${issuer}/protocol/openid-connect/certs`,
};
