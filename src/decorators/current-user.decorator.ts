import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { AuthenticatedRequest, AuthUser } from '../types/auth.types';

type UserIdSource = 'db' | 'keycloak';

function getAuthenticatedRequest(ctx: ExecutionContext): AuthenticatedRequest {
  return ctx.switchToHttp().getRequest<AuthenticatedRequest>();
}

/**
 * Decorator to extract the current authenticated user from the request
 * Use with @UseGuards(KeycloakAuthGuard) to ensure user is authenticated
 *
 * @example
 * ```typescript
 * @Get('profile')
 * @UseGuards(KeycloakAuthGuard)
 * getProfile(@CurrentUser() user: User) {
 *   return user;
 * }
 * ```
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUser | undefined => {
    const request = getAuthenticatedRequest(ctx);
    return request.user;
  },
);

/**
 * Decorator to extract the JWT token payload from the request
 * Use with @UseGuards(KeycloakAuthGuard) to ensure token is verified
 *
 * @example
 * ```typescript
 * @Get('token-info')
 * @UseGuards(KeycloakAuthGuard)
 * getTokenInfo(@CurrentToken() token: JwtPayload) {
 *   return { iss: token.iss, exp: token.exp };
 * }
 * ```
 */
export const CurrentToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = getAuthenticatedRequest(ctx);
    return request.token;
  },
);

/**
 * Decorator to extract the authenticated user's id from the request
 * Default source is internal database id. Use 'keycloak' for OIDC subject id.
 *
 * @example
 * ```typescript
 * @Get('me')
 * @UseGuards(KeycloakAuthGuard)
 * getMe(@CurrentUserId() userId: string) {
 *   return this.userService.getUserById(userId);
 * }
 *
 * @Get('my-keycloak-id')
 * @UseGuards(KeycloakAuthGuard)
 * getMyKeycloakId(@CurrentUserId('keycloak') keycloakId: string) {
 *   return { keycloakId };
 * }
 * ```
 */
export const CurrentUserId = createParamDecorator(
  (source: UserIdSource | undefined, ctx: ExecutionContext): string => {
    const request = getAuthenticatedRequest(ctx);

    if (source === 'keycloak') {
      const keycloakId = request.token?.sub;
      if (!keycloakId) {
        throw new UnauthorizedException(
          'Missing authenticated Keycloak user id',
        );
      }
      return keycloakId;
    }

    const userId = request.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Missing authenticated user id');
    }

    return userId;
  },
);
