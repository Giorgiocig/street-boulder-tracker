import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BoulderModule } from './boulder/boulder.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true }), BoulderModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
