import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@main/nest/shared/services/prisma.service';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find a user role by user ID, role ID, and optional branch ID
   */
  async findUserRoleAndValidateSameUserId(userId: number, userRoleId: number) {
    const userRoleWithPermissions =
      await this.prisma.userRole.findUniqueOrThrow({
        where: {
          id: userRoleId
        },
        include: {
          role: {
            include: {
              rolePermissions: {
                include: {
                  permission: true
                }
              }
            }
          }
        }
      });
    if (userRoleWithPermissions.userId !== userId) {
      throw new UnauthorizedException('User role does not belong to the user');
    }

    return {
      ...userRoleWithPermissions,
      allPermissions: userRoleWithPermissions.role.rolePermissions.map(
        (rp) => rp.permissionAction
      )
    };
  }
}
