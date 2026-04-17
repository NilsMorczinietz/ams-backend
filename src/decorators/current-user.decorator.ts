import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AuthenticatedRequest, AuthUser } from '../types/auth.types';

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
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
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
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.token;
  },
);
