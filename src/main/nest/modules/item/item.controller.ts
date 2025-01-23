import { Controller, Get, Query } from "@nestjs/common";
import { ItemService } from "./item.service";
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";
import { ItemQuery } from "@shared/types/benefit/benefit.dto";

@Controller("item")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get("name")
  getItemByName(@Query() query: CastQueryFieldsToStrings<ItemQuery>) {
    return this.itemService.getItemByName(query);
  }
}
