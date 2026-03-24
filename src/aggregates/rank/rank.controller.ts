import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateRankDto, GetRankDto, UpdateRankDto } from './dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RankService } from './rank.service';

@ApiTags('ranks')
@Controller('ranks')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Post()
  @ApiBody({ type: CreateRankDto })
  @ApiResponse({ status: 201, type: GetRankDto })
  async createRank(@Body() dto: CreateRankDto): Promise<GetRankDto> {
    const newRank = await this.rankService.createRank(dto);
    return new GetRankDto(newRank);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: GetRankDto })
  async getRankById(@Param('id') id: string): Promise<GetRankDto> {
    const rank = await this.rankService.getRankById(id);
    return new GetRankDto(rank);
  }

  @Get()
  @ApiResponse({ status: 200, type: [GetRankDto] })
  async getAllRanks(): Promise<GetRankDto[]> {
    const ranks = await this.rankService.getAll();
    return ranks.map((rank) => new GetRankDto(rank));
  }

  @Patch(':id')
  @ApiBody({ type: UpdateRankDto })
  @ApiResponse({ status: 200, type: GetRankDto })
  async updateRank(
    @Param('id') id: string,
    @Body() dto: UpdateRankDto,
  ): Promise<GetRankDto> {
    console.log('Updating rank:', dto);
    const updatedRank = await this.rankService.updateRank(id, dto);
    return new GetRankDto(updatedRank);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  async deleteRankById(@Param('id') id: string): Promise<void> {
    return await this.rankService.deleteRankById(id);
  }
}
