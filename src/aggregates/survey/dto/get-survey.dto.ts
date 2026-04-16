import { ApiProperty } from '@nestjs/swagger';
import { Survey, SurveyType } from 'generated/prisma/client';

export class GetSurveyDto {
  @ApiProperty({ example: 'f2a9d3b7-1c4e-48f2-9d8b-7e6a5c3b2f1a' })
  id: string;

  @ApiProperty({ example: 'Bestandsabfrage' })
  name: string;

  @ApiProperty({
    example: 'Hiermit werden alle bereits durchgeführten Lehrgänge abgefragt.',
  })
  description?: string;

  @ApiProperty({ example: SurveyType.COURSE_INVENTORY })
  type: SurveyType;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  startDate: Date;

  @ApiProperty({ example: '2024-12-31T23:59:59.000Z' })
  endDate: Date;

  @ApiProperty({ example: '2023-11-01T00:00:00.000Z' })
  createdAt: Date;

  constructor(survey: Survey) {
    this.id = survey.id;
    this.name = survey.name;
    this.description = survey.description ?? undefined;
    this.type = survey.type;
    this.startDate = survey.startDate;
    this.endDate = survey.endDate;
    this.createdAt = survey.createdAt;
  }
}
