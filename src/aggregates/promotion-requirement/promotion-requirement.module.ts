import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PromotionRequirementService } from './promotion-requirement.service';
import { PromotionRequirementController } from './promotion-requirement.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PromotionRequirementController],
  providers: [PromotionRequirementService],
})
export class PromotionRequirementModule {}
