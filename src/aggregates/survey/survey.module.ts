import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
