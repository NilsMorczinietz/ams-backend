import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { KeycloakAuthGuard } from 'src/auth/auth.guard';
import { UserModule } from 'src/aggregates/user/user.module';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule, UserModule],
  controllers: [HealthController],
  providers: [KeycloakAuthGuard],
})
export class HealthModule {}
