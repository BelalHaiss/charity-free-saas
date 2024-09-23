import {
  Controller,
  Post,
  Get,
  Query,
  Param,
  Patch,
  Delete,
  Body,
} from "@nestjs/common";
import { ItemQuery } from "@shared/types/item/item.dto";
import type { CastQueryFieldsToStrings } from "@shared/types/util.types";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { ItemService } from "./item.service";

@Controller("item")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get("item")
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
