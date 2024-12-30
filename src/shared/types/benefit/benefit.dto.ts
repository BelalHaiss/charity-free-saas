import { Item, Prisma } from "@prisma/client";

export type CreateNewItem = Omit<Item, "id" | "benefit_id">;
export type EditItemPayload = Required<
  Pick<Prisma.ItemUncheckedUpdateInput, "name" | "qty" | "category_id"> & {
    id: number;
  }
>;

export type ItemQuery = {
  name: string;
};

export type ItemChangeQty = { itemId: number; change: number };

export type CreateFinancialBenefitPayload = Omit<
  Prisma.FinancialBenefitUncheckedCreateInput,
  "benefit_id"
>;

export type EditFinancialBenefitPayload = Required<
  Pick<Prisma.FinancialBenefitUncheckedCreateInput, "amount" | "name"> & {
    id: number;
  }
>;

export type deleteBenefitItems = number[];
