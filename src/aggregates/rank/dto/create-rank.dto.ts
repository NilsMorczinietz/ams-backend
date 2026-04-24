import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRankDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiProperty({ example: 'Brandoberinspektor' })
  name!: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiProperty({ example: 'BOI' })
  abbreviation!: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: false })
  isDefault!: boolean;
}
