import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PromotionRequirementService } from './promotion-requirement.service';
import { GetPromotionRequirementsByRankDto } from './dto';

@ApiTags('promotion-requirements')
@Controller('promotion-requirements')
export class PromotionRequirementController {
  constructor(private readonly service: PromotionRequirementService) {}

  @Get()
  @ApiResponse({ status: 200, type: [GetPromotionRequirementsByRankDto] })
  async getAll(): Promise<GetPromotionRequirementsByRankDto[]> {
    return this.service.getAll();
  }
}
