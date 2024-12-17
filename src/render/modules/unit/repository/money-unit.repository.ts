import { MoneyUnit } from "@prisma/client";
import { fetcher } from "@render/utils/api.util";

class MoneyUnitRepository {
  getAllUnits() {
    return fetcher<MoneyUnit[]>({ url: `/unit/money` });
  }
}

export const moneyUnitRepository = new MoneyUnitRepository();
