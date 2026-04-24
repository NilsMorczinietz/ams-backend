import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { SurveyType } from 'generated/prisma/client';

export class UpdateSurveyDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiPropertyOptional({ example: 'Bestandsabfrage' })
  name?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiPropertyOptional({
    example: 'Hiermit werden alle bereits durchgeführten Lehrgänge abgefragt.',
  })
  description?: string;

  @IsOptional()
  @IsEnum(SurveyType)
  @ApiPropertyOptional({
    example: SurveyType.COURSE_INVENTORY,
    enum: SurveyType,
  })
  type?: SurveyType;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiPropertyOptional({
    example: '2024-01-01T00:00:00.000Z',
  })
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiPropertyOptional({
    example: '2024-12-31T23:59:59.000Z',
  })
  endDate?: Date;
}
