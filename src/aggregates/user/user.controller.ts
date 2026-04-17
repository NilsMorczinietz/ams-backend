import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { KeycloakAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser, CurrentToken } from 'src/decorators';
import type { AuthUser, JwtPayload } from 'src/types';
import { UserService } from './user.service';
import { CreateUserDto, GetUserDto, UpdateUserDto } from './dto';
import { User } from 'generated/prisma/client';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, type: GetUserDto })
  async createUser(@Body() dto: CreateUserDto): Promise<GetUserDto> {
    const newUser: User = await this.userService.createUser(dto);
    return new GetUserDto(newUser);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: GetUserDto })
  async getUserById(@Param('id') id: string): Promise<GetUserDto> {
    const user = await this.userService.getUserById(id);
    return new GetUserDto(user);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, type: GetUserDto })
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<GetUserDto> {
    const updatedUser: User = await this.userService.updateUser(id, dto);
    return new GetUserDto(updatedUser);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  async deleteUserById(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUserById(id);
  }

  /**
   * Get current user profile
   * Requires authentication
   */
  @Get('profile')
  @UseGuards(KeycloakAuthGuard)
  getProfile(@CurrentUser() user: AuthUser) {
    return {
      success: true,
      data: user,
    };
  }

  /**
   * Get current user with full token info
   * Requires authentication
   */
  @Get('me')
  @UseGuards(KeycloakAuthGuard)
  getCurrentUser(
    @CurrentUser() user: AuthUser,
    @CurrentToken() token: JwtPayload,
  ) {
    return {
      success: true,
      data: {
        user,
        tokenInfo: {
          issuer: token.iss,
          audience: token.aud,
          expiresAt: new Date(token.exp * 1000).toISOString(),
          issuedAt: new Date(token.iat * 1000).toISOString(),
        },
      },
    };
  }
}
