import { PrismaInteractiveTransaction } from '@shared/types/prisma.types';
import { OrganizationServiceI } from './interfaces/organization.service.interface';
import {
  OrganizationAppModel,
  OrganizationToServer
} from '@shared/types/organization/organization.dto';
import { Injectable } from '@nestjs/common';
import { InitialSetupToServer } from '@shared/types/setup/initial.dto';

@Injectable()
export class OrganizationService implements OrganizationServiceI {
  async createOrganization(
    tx: PrismaInteractiveTransaction,
    organization: OrganizationToServer,
    branch: InitialSetupToServer['branch']
  ): Promise<OrganizationAppModel> {
    return tx.organization.create({
      data: {
        ...organization,
        branches: {
          create: {
            id: 1,
            ...branch
          }
        }
      },
      include: {
        branches: {
          include: {
            sponsorships_cases: true
          }
        }
      }
    });
  }
}
