import { Item } from "@prisma/client";

export type CreateNewItem = Omit<Item, "id" | "benefit_id">;

export type ItemQuery = {
  name: string;
};

export type ItemChangeQty = { itemId: number; change: number };
