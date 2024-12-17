import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { CustomException } from "@main/nest/shared/exception/CustomException";
import { getLocalizedErrorMessage } from "@shared/i18n-error-messages";
import { Locale } from "@shared/types/util.types";
import { removeFields } from "@shared/services/object.util";
import { LoginResponse } from "@shared/types/auth/auth.dto";
import { JWT_PAYLOAD } from "@main/nest/types/auth.types";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    passwordPayload: string,
    locale: Locale,
  ): Promise<LoginResponse> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new CustomException({
        message: getLocalizedErrorMessage(locale, "noUsernameFound"),
        status: HttpStatus.UNAUTHORIZED,
      });
    }
    const passwordHash = argon2.verify(user.password, passwordPayload);
    if (!passwordHash) {
      throw new CustomException({
        message: getLocalizedErrorMessage(locale, "passwordWrong"),
        status: HttpStatus.UNAUTHORIZED,
      });
    }
    const payload: JWT_PAYLOAD = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: removeFields(user, ["password"]),
    };
  }
}
