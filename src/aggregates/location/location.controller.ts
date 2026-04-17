import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { KeycloakAuthGuard } from 'src/auth/auth.guard';
import { LocationService } from './location.service';
import { CreateLocationDto, GetLocationDto, UpdateLocationDto } from './dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @UseGuards(KeycloakAuthGuard)
  @ApiBody({ type: CreateLocationDto })
  @ApiResponse({ status: 201, type: GetLocationDto })
  async createLocation(
    @Body() dto: CreateLocationDto,
  ): Promise<GetLocationDto> {
    const newLocation = await this.locationService.createLocation(dto);
    return new GetLocationDto(newLocation);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: GetLocationDto })
  async getLocationById(@Param('id') id: string): Promise<GetLocationDto> {
    const location = await this.locationService.getLocationById(id);
    return new GetLocationDto(location);
  }

  @Get()
  @ApiResponse({ status: 200, type: [GetLocationDto] })
  async getAllLocations(): Promise<GetLocationDto[]> {
    const locations = await this.locationService.getAll();
    return locations.map((location) => new GetLocationDto(location));
  }

  @Patch(':id')
  @ApiBody({ type: UpdateLocationDto })
  @ApiResponse({ status: 200, type: GetLocationDto })
  async updateLocation(
    @Param('id') id: string,
    @Body() dto: UpdateLocationDto,
  ): Promise<GetLocationDto> {
    const updatedLocation = await this.locationService.updateLocation(id, dto);
    return new GetLocationDto(updatedLocation);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  async deleteLocationById(@Param('id') id: string): Promise<void> {
    return await this.locationService.deleteLocationById(id);
  }
}
