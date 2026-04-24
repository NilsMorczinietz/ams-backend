import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSurveyDto, GetSurveyDto } from './dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
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

  @Patch(':id')
  @ApiBody({ type: UpdateSurveyDto })
  @ApiResponse({ status: 200, type: GetSurveyDto })
  async updateSurvey(
    @Param('id') id: string,
    @Body() dto: UpdateSurveyDto,
  ): Promise<GetSurveyDto> {
    const updatedSurvey = await this.surveyService.updateSurvey(id, dto);
    return new GetSurveyDto(updatedSurvey);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  async deleteSurveyById(@Param('id') id: string): Promise<void> {
    return await this.surveyService.deleteSurveyById(id);
  }
}
