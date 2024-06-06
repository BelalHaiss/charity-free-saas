import { Injectable } from '@nestjs/common';
import { OrganizationService } from '../organization/organization.service';
import { SetupServiceI } from './interfaces/setup.service.interface';
import {
  InitialSetupToClient,
  InitialSetupClient,
  InitialSetupToServer
} from '@shared/types/setup/initial.dto';
import { PrismaService } from '@main/nest/shared/services/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class SetupService implements SetupServiceI {
  constructor(
    private organizationService: OrganizationService,
    private prismaService: PrismaService,
    private userService: UserService
  ) {}
  async initialSetup(
    data: InitialSetupToServer
  ): Promise<InitialSetupToClient> {
    return this.prismaService.$transaction(async (tx) => {
      const organization = await this.organizationService.createOrganization(
        tx,
        data.organization,
        data.branch
      );
      const admin = await this.userService.createInitialAdmin(
        tx,
        data.adminUser
      );
      const response: InitialSetupToClient = {
        user: admin,
        organization
      };
      return response;
    });
  }
}
