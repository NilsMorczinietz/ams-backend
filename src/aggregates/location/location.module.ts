import { Module } from '@nestjs/common';
import { KeycloakAuthGuard } from 'src/auth/auth.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/aggregates/user/user.module';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [LocationController],
  providers: [LocationService, KeycloakAuthGuard],
})
export class LocationModule {}
