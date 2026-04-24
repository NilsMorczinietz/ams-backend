import { ApiProperty } from '@nestjs/swagger';
import { User } from 'generated/prisma/client';

export class GetUserDto {
  @ApiProperty({ example: 'b7f3c9d2-4e8a-42f1-9a6b-3c2d1e4f5a6b' })
  id: string;

  @ApiProperty({ example: null })
  mpid?: string;

  @ApiProperty({ example: '3f1c2d4e-8a7b-4d9f-91c2-6e5b8f1a2d3c' })
  keycloakId: string;

  @ApiProperty({ example: 'Max Mustermann' })
  name: string;

  @ApiProperty({ example: 'max.mustermann@example.com' })
  email: string;

  @ApiProperty({ example: '2024-01-01T12:00:00Z' })
  joinedAt?: Date;

  @ApiProperty({ example: '2024-01-01T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: null })
  updatedAt?: Date;

  @ApiProperty({ example: null })
  addressId?: string;

  @ApiProperty({ example: null })
  rankId?: string;

  constructor(user: User) {
    this.id = user.id;
    this.mpid = user.mpid ?? undefined;
    this.keycloakId = user.keycloakId;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.joinedAt = user.joinedAt ?? undefined;
    this.updatedAt = user.updatedAt ?? undefined;
    this.addressId = user.addressId ?? undefined;
    this.rankId = user.rankId ?? undefined;
  }
}
