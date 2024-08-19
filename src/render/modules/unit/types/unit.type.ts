import { Unit, UNIT_SIZE } from "@prisma/client";

export type GroupedUnits = { category: string; units: Unit[] };

export type UnitCategoryOptions = { category: string; units: UnitOption[] };
export type UnitOption = { unitLabel: string; sizes: UnitWithSize[] };
export type UnitWithSize = {
  id: number;
  size: UNIT_SIZE;
  label: string;
  abbr: string;
};
