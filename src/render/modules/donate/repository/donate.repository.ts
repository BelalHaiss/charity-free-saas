import { Donate } from "@prisma/client";
import { fetcher } from "@render/utils/api.util";
import { QueryDonateByDate } from "@shared/types/donates/donates.dto";
import qs from "qs";

class DonateRepository {
  getDonatesByDate(query: QueryDonateByDate): Promise<Donate[]> {
    const queryString = qs.stringify(query);

    return fetcher<Donate[]>({ url: `donate/?${queryString}` });
  }
}

export const donateRepository = new DonateRepository();
