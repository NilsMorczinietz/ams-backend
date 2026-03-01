import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsUUID, ValidateNested } from 'class-validator';

export class RankOrderItem {
  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  level: number;
}

export class ReorderRanksDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RankOrderItem)
  @ApiProperty({ type: [RankOrderItem] })
  ranks: RankOrderItem[];
}
