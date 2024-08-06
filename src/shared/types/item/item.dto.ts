import { Item } from "@prisma/client";

export type CreateNewItem = Omit<Item, "id">;
