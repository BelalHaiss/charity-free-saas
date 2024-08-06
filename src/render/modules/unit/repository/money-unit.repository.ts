import { MoneyUnit } from "@prisma/client";
import { fetcher } from "@render/utils/api.util";

class MoneyUnitRepository {
  getAllUnits() {
    return fetcher<MoneyUnit[]>({ url: "money_unit" });
  }
}

export const moneyUnitRepository = new MoneyUnitRepository();
