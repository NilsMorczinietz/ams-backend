import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSurveyDto, GetSurveyDto } from './dto';
import { Survey } from 'generated/prisma/client';
import { KeycloakAuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/decorators';
import type { AuthUser } from 'src/types';

@ApiTags('surveys')
@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  @UseGuards(KeycloakAuthGuard)
  @ApiBody({ type: CreateSurveyDto })
  @ApiResponse({ status: 201, type: GetSurveyDto })
  async createSurvey(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateSurveyDto,
  ): Promise<GetSurveyDto> {
    const newSurvey: Survey = await this.surveyService.createSurvey(
      dto,
      user.id,
    );
    return new GetSurveyDto(newSurvey);
  }

  @Get(':id')
  @UseGuards(KeycloakAuthGuard)
  @ApiResponse({ status: 200, type: GetSurveyDto })
  async getSurveyById(@Param('id') id: string): Promise<GetSurveyDto> {
    const survey = await this.surveyService.getSurveyById(id);
    return new GetSurveyDto(survey);
  }

  @Get()
  @UseGuards(KeycloakAuthGuard)
  @ApiResponse({ status: 200, type: [GetSurveyDto] })
  async getAllSurveys(): Promise<GetSurveyDto[]> {
    const surveys = await this.surveyService.getAll();
    return surveys.map((survey) => new GetSurveyDto(survey));
  }
}
