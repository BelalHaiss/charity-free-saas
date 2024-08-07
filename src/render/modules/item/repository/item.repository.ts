import { fetcher } from "@render/utils/api.util";
import { CreateNewItem } from "@shared/types/item/item.dto";

class ItemRepository {
  createItem(newItem: CreateNewItem) {
    return fetcher({
      url: `benefit/item`,
      config: { method: "POST", data: newItem },
    });
  }
}

export const itemRepository = new ItemRepository();
