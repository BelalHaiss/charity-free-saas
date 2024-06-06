import type {
  InitialSetupToClient,
  InitialSetupToServer
} from '@shared/types/setup/initial.dto';

export interface SetupServiceI {
  initialSetup(data: InitialSetupToServer): Promise<InitialSetupToClient>;
}
