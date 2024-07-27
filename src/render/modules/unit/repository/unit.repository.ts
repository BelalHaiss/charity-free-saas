import { Unit } from "@prisma/client";
import { fetcher } from "@render/utils/api.util";

class UnitRepository {
  getAllUnits() {
    return fetcher<Unit[]>({ url: "unit" });
  }
}

export const unitRepository = new UnitRepository();
