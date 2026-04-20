import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { KeycloakAuthGuard } from 'src/auth/auth.guard';
import { UserModule } from 'src/aggregates/user/user.module';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [SurveyController],
  providers: [SurveyService, KeycloakAuthGuard],
})
export class SurveyModule {}
