import { ApiProperty } from '@nestjs/swagger';
import { Rank } from 'generated/prisma/client';

export class GetRankDto {
  @ApiProperty({ example: 'f2a9d3b7-1c4e-48f2-9d8b-7e6a5c3b2f1a' })
  id: string;

  @ApiProperty({ example: 'Brandoberinspektor' })
  name: string;

  @ApiProperty({ example: 'BOI' })
  abbreviation?: string;

  @ApiProperty({ example: false })
  isDefault: boolean;

  constructor(rank: Rank) {
    this.id = rank.id;
    this.name = rank.name;
    this.abbreviation = rank.abbreviation;
    this.isDefault = rank.isDefault;
  }
}
