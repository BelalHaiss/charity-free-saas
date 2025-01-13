import { Global, Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { Module } from "@nestjs/common";
import {
  CastValues,
  PaginationOptions,
  SortOptions,
} from "@shared/types/util.types";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  handlePagination(query: CastValues<PaginationOptions, number | string>) {
    return {
      take: +query.pageSize,
      skip: +query.pageSize * +query.page,
    };
  }

  handleSorting<S extends object>(
    sorting?: SortOptions<S>,
  ): SortOptions<S>[] | undefined {
    if (!sorting) {
      return undefined;
    }

    return Object.keys(sorting).map((key) => ({
      [key as keyof S]: sorting[key as keyof S],
    })) as SortOptions<S>[];
  }
}

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
