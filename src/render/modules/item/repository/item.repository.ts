import { Item } from "@prisma/client";
import { fetcher } from "@render/utils/api.util";
import { CreateNewItem } from "@shared/types/benefit/benefit.dto";
import { ItemDTO } from "@shared/types/item/item.dto";
import qs from "qs";

class ItemRepository {
  createItem(newItem: CreateNewItem) {
    return fetcher({
      url: `/benefit/item`,
      config: { method: "POST", data: newItem },
    });
  }

  getItemByName(name: string) {
    const nameQuery = qs.stringify({ name });
    return fetcher<Item[]>({
      url: `/item/name/?${nameQuery}`,
    });
  }

  getItemById(id: number) {
    return fetcher<ItemDTO | null>({
      url: `/item/${id}`,
    });
  }
}

export const itemRepository = new ItemRepository();
