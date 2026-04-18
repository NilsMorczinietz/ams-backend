import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from 'generated/prisma/client';
import { JwtPayload } from 'src/types';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async upsertFromKeycloakClaims(claims: JwtPayload): Promise<User> {
    const oid = claims.sub;
    const name = this.resolveName(claims);
    const email = this.resolveEmail(claims);

    return this.prisma.user.upsert({
      where: { oid },
      create: {
        oid,
        name,
        email,
      },
      update: {
        name,
        email,
      },
    });
  }

  async getUserByOid(oid: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: { oid },
    });
  }

  async getUserById(id: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: { email },
    });
  }

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: { ...dto },
    });
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { ...dto },
    });
  }

  async deleteUserById(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  private resolveName(claims: JwtPayload): string {
    return claims.name ?? claims.preferred_username ?? 'Unknown User';
  }

  private resolveEmail(claims: JwtPayload): string {
    if (claims.email && claims.email.trim().length > 0) {
      return claims.email;
    }

    const preferredUsername = claims.preferred_username?.trim();
    if (preferredUsername && preferredUsername.includes('@')) {
      return preferredUsername;
    }

    return `${claims.sub}@keycloak.local`;
  }
}
