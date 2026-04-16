import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSurveyDto } from './dto';

@Injectable()
export class SurveyService {
  constructor(private readonly prisma: PrismaService) {}

  async getSurveyById(id: string): Promise<Prisma.SurveyGetPayload<object>> {
    return this.prisma.survey.findUniqueOrThrow({
      where: { id },
    });
  }

  async getAll(): Promise<Prisma.SurveyGetPayload<object>[]> {
    return this.prisma.survey.findMany();
  }

  async createSurvey(
    dto: CreateSurveyDto,
  ): Promise<Prisma.SurveyGetPayload<object>> {
    return this.prisma.survey.create({
      data: { ...dto },
    });
  }

  async deleteSurveyById(id: string): Promise<void> {
    await this.prisma.survey.delete({
      where: { id },
    });
  }
}
