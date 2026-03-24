import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  GetPromotionRequirementDto,
  GetPromotionRequirementGroupDto,
  GetPromotionRequirementsByRankDto,
} from './dto';

@Injectable()
export class PromotionRequirementService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<GetPromotionRequirementsByRankDto[]> {
    const requirements = await this.prisma.promotionRequirement.findMany({
      include: {
        requiredRank: true,
        requiredCourse: true,
      },
      orderBy: [{ rankId: 'asc' }, { groupKey: 'asc' }],
    });

    // Group by rank, then by groupKey — order preserved from DB sort
    const byRank = new Map<string, typeof requirements>();
    for (const req of requirements) {
      const bucket = byRank.get(req.rankId);
      if (bucket) bucket.push(req);
      else byRank.set(req.rankId, [req]);
    }

    return Array.from(byRank.values()).map((reqs) => {
      const byGroup = new Map<string | null, typeof reqs>();
      for (const req of reqs) {
        const key = req.groupKey ?? null;
        const bucket = byGroup.get(key);
        if (bucket) bucket.push(req);
        else byGroup.set(key, [req]);
      }

      const groups = Array.from(byGroup.entries()).map(
        ([groupKey, groupReqs]) =>
          new GetPromotionRequirementGroupDto(
            groupKey,
            groupReqs.map((r) => new GetPromotionRequirementDto(r)),
          ),
      );

      return new GetPromotionRequirementsByRankDto(reqs[0].rankId, groups);
    });
  }
}
