import { Injectable, PipeTransform } from '@nestjs/common';
import type {
  InitialSetupClient,
  InitialSetupToServer
} from '@shared/types/setup/initial.dto';

@Injectable()
export class initialSetupClientToServer
  implements PipeTransform<InitialSetupClient, InitialSetupToServer>
{
  transform(value: InitialSetupClient): InitialSetupToServer {
    const serverData: InitialSetupToServer = {
      adminUser: value.adminUser,
      organization: value.organization,
      branch: {
        ...value.branch,
        sponsorships_cases: {
          create: value.branch.sponsorships_cases.map((creatableSelect) => ({
            name: creatableSelect.value
          }))
        }
      }
    };
    return serverData;
  }
}
