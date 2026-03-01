import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRankDto, ReorderRanksDto, UpdateRankDto } from './dto';

@Injectable()
export class RankService {
  constructor(private readonly prisma: PrismaService) {}

  async getRankById(id: string): Promise<Prisma.RankGetPayload<object>> {
    return this.prisma.rank.findUniqueOrThrow({
      where: { id },
    });
  }

  async getAll(): Promise<Prisma.RankGetPayload<object>[]> {
    return this.prisma.rank.findMany({
      orderBy: {
        level: 'asc',
      },
    });
  }

  async createRank(dto: CreateRankDto): Promise<Prisma.RankGetPayload<object>> {
    return this.prisma.rank.create({
      data: {
        name: dto.name,
        abbreviation: dto.abbreviation,
        level: (await this.getMaxLevel()) + 1,
      },
    });
  }

  async updateRank(
    id: string,
    dto: UpdateRankDto,
  ): Promise<Prisma.RankGetPayload<object>> {
    return this.prisma.rank.update({
      where: { id },
      data: {
        name: dto.name,
        abbreviation: dto.abbreviation,
        level: dto.level,
      },
    });
  }

  async deleteRankById(id: string): Promise<void> {
    await this.prisma.rank.delete({
      where: { id },
    });
  }

  async getMaxLevel(): Promise<number> {
    return this.prisma.rank
      .aggregate({
        _max: {
          level: true,
        },
      })
      .then((result) => result._max.level || 0);
  }

  async reorderRanks(dto: ReorderRanksDto): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      // Step 1: Set all affected ranks to negative temporary values to avoid unique constraint violations
      for (let i = 0; i < dto.ranks.length; i++) {
        await tx.rank.update({
          where: { id: dto.ranks[i].id },
          data: { level: -(i + 1) },
        });
      }

      // Step 2: Set the actual new levels
      for (const rank of dto.ranks) {
        await tx.rank.update({
          where: { id: rank.id },
          data: { level: rank.level },
        });
      }
    });
  }
}
