import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import type { LoginPayload } from "@shared/types/auth/auth.dto";
import { Language } from "@main/nest/decorator/headers.decorator";
import type { Locale } from "@shared/types/util.types";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  create(@Body() payload: LoginPayload, @Language() locale: Locale) {
    return this.authService.signIn(payload.username, payload.password, locale);
  }
}
