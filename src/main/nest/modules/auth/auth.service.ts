import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { CustomException } from '@main/nest/shared/exception/CustomException';
import { getLocalizedErrorMessage } from '@shared/i18n-error-messages';
import { Locale } from '@shared/types/util.types';
import {
  mapObjectArrayToItemArray,
  removeFields
} from '@shared/services/object.util';
import { LoginResponse } from '@shared/types/auth/auth.dto';
import { JWT_PAYLOAD } from '@main/nest/types/auth.types';
import { UserWithBranches } from '@shared/types/user/user.dto';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateToken(token: string, locale: Locale): Promise<LoginResponse> {
    try {
      const payload: JWT_PAYLOAD = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('AUTH_SECRET')
      });

      const user = await this.usersService.findUserById(payload.sub);
      if (!user) {
        this.throwUnAuthorizedException(locale);
      }
      return this.handleUserResponseWithToken(removeFields(user, ['password']));
    } catch (error) {
      this.throwUnAuthorizedException(locale);
    }
  }
  async signIn(
    username: string,
    passwordPayload: string,
    locale: Locale
  ): Promise<LoginResponse> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new CustomException({
        message: getLocalizedErrorMessage(locale, 'noUsernameFound'),
        status: HttpStatus.UNAUTHORIZED
      });
    }
    const passwordHash = await argon2.verify(user.password, passwordPayload);
    if (!passwordHash) {
      throw new CustomException({
        message: getLocalizedErrorMessage(locale, 'passwordWrong'),
        status: HttpStatus.UNAUTHORIZED
      });
    }
    return this.handleUserResponseWithToken(removeFields(user, ['password']));
  }
  public extractTokenFromHeader(request: Request): string | undefined {
    return this.extractTokenFromBearerToken(request.headers.authorization);
  }

  public extractTokenFromBearerToken(
    bearerToken: string | undefined
  ): string | undefined {
    const [type, token] = bearerToken?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  public throwUnAuthorizedException(locale: Locale): never {
    throw new CustomException({
      message: getLocalizedErrorMessage(locale, 'unauthorizedAccess'),
      status: HttpStatus.UNAUTHORIZED
    });
  }

  async handleUserResponseWithToken(user: UserWithBranches) {
    const payload: JWT_PAYLOAD = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: user
    };
  }
}
