import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { getUserLocaleFromRequest } from '@main/nest/decorator/headers.decorator';
import { AuthService } from './auth.service';
import { HEADER_KEYS } from '@shared/services/http-headers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const locale = getUserLocaleFromRequest(request);
    const token = this.authService.extractTokenFromHeader(request);
    const activeUserRole = request.header(HEADER_KEYS.USER_ROLE_ID);
    if (!token || !activeUserRole) {
      this.authService.throwUnAuthorizedException(locale);
    }
    try {
      const { user } = await this.authService.validateToken(token, locale);

      // request['user'] = user;
    } catch {
      this.authService.throwUnAuthorizedException(locale);
    }
    return true;
  }
}
