import { Global, Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { Module } from "@nestjs/common";
import {
  ApiPaginationQueryParams,
  CastQueryFieldsToStrings,
  SortOptions,
} from "@shared/types/util.types";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  filterPaginate(
    query: CastQueryFieldsToStrings<ApiPaginationQueryParams<object>>,
  ) {
    return {
      take: +query.pagination.pageSize,
      skip: +query.pagination.pageSize * +query.pagination.page,
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
