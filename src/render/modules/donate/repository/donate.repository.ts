import { Donate } from "@prisma/client";
import { fetcher } from "@render/utils/api.util";
import {
  DonateWithRelations,
  NewDonate,
  QueryDonateByDate,
} from "@shared/types/donates/donates.dto";
import { CastDateFieldsToIsoDate } from "@shared/types/util.types";
import qs from "qs";

class DonateRepository {
  getDonatesByDate(query: QueryDonateByDate): Promise<DonateWithRelations[]> {
    const queryString = qs.stringify(query);

    return fetcher<DonateWithRelations[]>({ url: `donate/?${queryString}` });
  }

  createNewDonate(data: NewDonate) {
    const newDonateServerDto: CastDateFieldsToIsoDate<NewDonate> = {
      ...data,
      date: data.date.toISOString(),
    };
    return fetcher({
      url: `donate`,
      config: { method: "POST", data: newDonateServerDto },
    });
  }
}

export const donateRepository = new DonateRepository();
