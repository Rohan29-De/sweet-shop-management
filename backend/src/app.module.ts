import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SweetsModule } from './sweets/sweets.module';

@Module({
  imports: [PrismaModule, AuthModule, SweetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
