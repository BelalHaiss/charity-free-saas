import { FinancialBenefit, Item, Prisma } from "@prisma/client";
import { ApiPaginationQueryParams } from "../util.types";

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

export type ItemBenefitTableFilteredFields = Pick<Item, "category_id" | "name">;
export type ItemBenefitsTableQuery = ApiPaginationQueryParams<
  ItemBenefitTableFilteredFields,
  Item
>;

export type FinancialBenefitsTableQuery = ApiPaginationQueryParams<
  null,
  FinancialBenefit
>;
