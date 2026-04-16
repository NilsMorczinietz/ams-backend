import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SurveyType } from 'generated/prisma/client';

export class CreateSurveyDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiProperty({ example: 'Bestandsabfrage' })
  name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiProperty({
    example: 'Hiermit werden alle bereits durchgeführten Lehrgänge abgefragt.',
  })
  description: string;

  @IsOptional()
  @ApiProperty({ example: SurveyType.COURSE_INVENTORY })
  type: SurveyType;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
  })
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiProperty({
    example: '2024-12-31T23:59:59.000Z',
  })
  endDate: Date;
}
