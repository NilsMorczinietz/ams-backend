import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import jwksClient, { JwksClient } from 'jwks-rsa';
import { decode, verify } from 'jsonwebtoken';
import { keycloakConfig } from './auth.config';
import type {
  JwtPayload,
  AuthenticatedRequest,
  AuthUser,
} from '../types/auth.types';

@Injectable()
export class KeycloakAuthGuard implements CanActivate {
  private readonly client: JwksClient = jwksClient({
    jwksUri: keycloakConfig.jwksUri,
  });

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers['authorization'] as string | undefined;

    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('No Authorization header');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid Authorization header format');
    }

    const token = authHeader.slice(7);

    try {
      const publicKey = await this.getPublicKey(token);

      const payload = verify(token, publicKey, {
        issuer: keycloakConfig.issuer,
        audience: keycloakConfig.audience,
        algorithms: ['RS256'],
      }) as JwtPayload;

      if (typeof payload !== 'object' || payload === null) {
        throw new UnauthorizedException('Invalid token payload');
      }

      if (!payload.sub) {
        throw new UnauthorizedException('Token subject is missing');
      }

      const authenticatedUser: AuthUser = {
        id: payload.sub,
        oid: payload.sub,
        name: payload.name ?? 'Unknown User',
        email: payload.email ?? payload.preferred_username ?? '',
      };

      // Attach user and token to request
      request.user = authenticatedUser;
      request.token = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        error instanceof Error ? error.message : 'Invalid token',
      );
    }
  }

  private async getPublicKey(token: string): Promise<string> {
    const decoded = decode(token, { complete: true });

    if (!decoded || typeof decoded === 'string') {
      throw new UnauthorizedException('Invalid token');
    }

    const key = await this.client.getSigningKey(decoded.header.kid);
    return key.getPublicKey();
  }
}
