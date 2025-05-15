import { fetcher } from "@render/utils/api.util";
import {
  ClientDonateWithRelations,
  NewDonate,
  QueryDonateByDate,
} from "@shared/types/donates/donates.dto";
import { CastDateFieldsToIsoDate } from "@shared/types/util.types";
import qs from "qs";

class DonateRepository {
  getDonatesByDate(
    query: QueryDonateByDate,
  ): Promise<ClientDonateWithRelations[]> {
    const queryString = qs.stringify(query);

    return fetcher<ClientDonateWithRelations[]>({
      url: `/donate/?${queryString}`,
    });
  }

  createNewDonate(data: NewDonate) {
    const newDonateServerDto: CastDateFieldsToIsoDate<NewDonate> = {
      ...data,
      date: data.date.toISOString(),
    };
    return fetcher({
      url: `/donate`,
      config: { method: "POST", data: newDonateServerDto },
    });
  }

  deleteDonateById(id: number) {
    return fetcher({
      url: `/donate/${id}`,
      config: { method: "DELETE" },
    });
  }
}

export const donateRepository = new DonateRepository();
