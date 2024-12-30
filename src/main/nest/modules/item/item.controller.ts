import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ItemService } from "./item.service";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";
import { ItemQuery } from "@shared/types/benefit/benefit.dto";

@Controller("item")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get("name")
  getItemByName(@Query() query: CastQueryFieldsToStrings<ItemQuery>) {
    return this.itemService.getItemByName(query);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.itemService.remove(+id);
  }
}
