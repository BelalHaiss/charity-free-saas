import { JWT_PAYLOAD, UserInRequestHeader } from "@main/nest/types/auth.types";
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { PrismaService } from "@main/nest/shared/services/prisma.service";
import { UserWithBranches } from "@shared/types/user/user.dto";
import { removeFields } from "@shared/services/object.util";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}
  private async findByUserId(id: number): Promise<UserWithBranches | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },

      include: {
        branches: true,
      },
    });
    if (!user) return null;

    return removeFields(user, ["password"]);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: JWT_PAYLOAD = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get("AUTH_SECRET"),
      });
      const user = await this.findByUserId(payload.sub);

      if (!user) {
        throw new UnauthorizedException();
      }
      const requestUser: UserInRequestHeader = {
        ...user,
        branches: user.branches.map((branch) => branch.branch_id),
      };
      console.log({ requestUser });
      request["user"] = requestUser;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
