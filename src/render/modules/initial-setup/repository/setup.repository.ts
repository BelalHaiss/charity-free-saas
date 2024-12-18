import { fetcher } from "@render/utils/api.util";
import { SetupStatusResponse } from "@shared/types/setup/initial.dto";

class SetupRepository {
  async isAppStatusDone(): Promise<boolean> {
    const res = await fetcher<SetupStatusResponse>({ url: "/setup/status" });
    return res.isSetupDone;
  }
}

export const setupRepository = new SetupRepository();
