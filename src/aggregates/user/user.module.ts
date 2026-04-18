import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { KeycloakAuthGuard } from 'src/auth/auth.guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, KeycloakAuthGuard],
  exports: [UserService],
})
export class UserModule {}
