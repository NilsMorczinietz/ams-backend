import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { KeycloakAuthGuard } from 'src/auth/auth.guard';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get('live')
  live() {
    return { status: 'UP' };
  }

  @Get('ready')
  @HealthCheck()
  ready() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
      // more checks e.g., database
    ]);
  }

  @Get('details')
  @UseGuards(KeycloakAuthGuard)
  @HealthCheck()
  details() {
    return this.health.check([
      //   () => this.http.pingCheck('external-api', 'https://example.com/health'),
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 1024 * 1024 * 1024),
    ]);
  }
}
