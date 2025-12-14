import { Module } from '@nestjs/common';
import { SweetsController } from './sweets.controller';
import { SweetsService } from './sweets.service';

import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [SweetsController],
  providers: [SweetsService]
})
export class SweetsModule { }
