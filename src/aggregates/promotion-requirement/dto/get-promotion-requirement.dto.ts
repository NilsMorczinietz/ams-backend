import { ApiProperty } from '@nestjs/swagger';
import { Prisma, RequirementType } from 'generated/prisma/client';
import { GetRankDto } from 'src/aggregates/rank/dto';
import { GetCourseDto } from 'src/aggregates/course/dto';

type FullRequirement = Prisma.PromotionRequirementGetPayload<{
  include: { requiredRank: true; requiredCourse: true };
}>;

export class GetPromotionRequirementDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: RequirementType })
  type: RequirementType;

  @ApiProperty({ required: false, nullable: true })
  minYears?: number;

  @ApiProperty({ required: false, nullable: true, type: () => GetRankDto })
  requiredRank?: GetRankDto;

  @ApiProperty({ required: false, nullable: true, type: () => GetCourseDto })
  requiredCourse?: GetCourseDto;

  @ApiProperty({ required: false, nullable: true })
  groupKey?: string;

  constructor(req: FullRequirement) {
    this.id = req.id;
    this.type = req.type;
    this.minYears = req.minYears ?? undefined;
    this.requiredRank = req.requiredRank
      ? new GetRankDto(req.requiredRank)
      : undefined;
    this.requiredCourse = req.requiredCourse
      ? new GetCourseDto(req.requiredCourse)
      : undefined;
    this.groupKey = req.groupKey ?? undefined;
  }
}

export class GetPromotionRequirementGroupDto {
  @ApiProperty({ nullable: true })
  groupKey: string | null;

  @ApiProperty({ type: [GetPromotionRequirementDto] })
  requirements: GetPromotionRequirementDto[];

  constructor(
    groupKey: string | null,
    requirements: GetPromotionRequirementDto[],
  ) {
    this.groupKey = groupKey;
    this.requirements = requirements;
  }
}

export class GetPromotionRequirementsByRankDto {
  @ApiProperty()
  rankId: string;

  @ApiProperty({ type: [GetPromotionRequirementGroupDto] })
  groups: GetPromotionRequirementGroupDto[];

  constructor(rankId: string, groups: GetPromotionRequirementGroupDto[]) {
    this.rankId = rankId;
    this.groups = groups;
  }
}
