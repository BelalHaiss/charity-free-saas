import { Module } from "@nestjs/common";
import { ItemService } from "./item.service";
import { ItemController } from "./ItemController";

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
