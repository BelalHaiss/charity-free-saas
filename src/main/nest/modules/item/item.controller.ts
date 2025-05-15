import { Controller, Get, Param, Query } from "@nestjs/common";
import { ItemService } from "./item.service";
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";
import { ItemQuery } from "@shared/types/benefit/benefit.dto";

@Controller("item")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get(":id")
  findItemById(@Param("id") id: string) {
    return this.itemService.findItemById(+id);
  }

  @Get("name")
  getItemByName(@Query() query: CastQueryFieldsToStrings<ItemQuery>) {
    return this.itemService.getItemByName(query);
  }
}
