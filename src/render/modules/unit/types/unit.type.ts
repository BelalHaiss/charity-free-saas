import { Unit } from "@prisma/client";

export type GroupedUnits = { category: string; units: Unit[] };
