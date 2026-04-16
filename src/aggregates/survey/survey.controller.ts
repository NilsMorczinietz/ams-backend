import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSurveyDto, GetSurveyDto } from './dto';
import { Survey } from 'generated/prisma/client';

@ApiTags('surveys')
@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  @ApiBody({ type: CreateSurveyDto })
  @ApiResponse({ status: 201, type: GetSurveyDto })
  async createSurvey(@Body() dto: CreateSurveyDto): Promise<GetSurveyDto> {
    const newSurvey: Survey = await this.surveyService.createSurvey(dto);
    return new GetSurveyDto(newSurvey);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: GetSurveyDto })
  async getSurveyById(@Param('id') id: string): Promise<GetSurveyDto> {
    const survey = await this.surveyService.getSurveyById(id);
    return new GetSurveyDto(survey);
  }

  @Get()
  @ApiResponse({ status: 200, type: [GetSurveyDto] })
  async getAllSurveys(): Promise<GetSurveyDto[]> {
    const surveys = await this.surveyService.getAll();
    return surveys.map((survey) => new GetSurveyDto(survey));
  }
}
