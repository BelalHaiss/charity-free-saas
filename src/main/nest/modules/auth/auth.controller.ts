import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { LoginPayload } from '@shared/types/auth/auth.dto';
import { Language } from '@main/nest/decorator/headers.decorator';
import type { Locale } from '@shared/types/util.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() payload: LoginPayload, @Language() locale: Locale) {
    return this.authService.signIn(payload.username, payload.password, locale);
  }

  @Post('validate-token')
  async validateToken(
    @Body('token') bearerToken: string,
    @Language() locale: Locale
  ) {
    const token = this.authService.extractTokenFromBearerToken(bearerToken);
    return this.authService.validateToken(token!, locale);
  }
}
