import { Global, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Module } from "@nestjs/common";
import { ApiPaginationQueryParams } from "@shared/types/util.types";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  filterPaginate(query: ApiPaginationQueryParams<object>) {
    return {
      take: query.pagination.pageSize,
      skip: query.pagination.pageSize * query.pagination.page,
    };
  }
}

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
