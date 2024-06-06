import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Module } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
