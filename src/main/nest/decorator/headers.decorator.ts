import {
  createParamDecorator,
  ExecutionContext,
  HttpStatus,
} from "@nestjs/common";
import { Request } from "express";
import { CustomException } from "../shared/exception/CustomException";
import { Locale } from "@shared/types/util.types";
import { UserWithBranchesIds } from "@shared/types/user/user.dto";

export const Timezone = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const timeZone = request.header("time-zone");
    if (!timeZone) {
      throw new CustomException({
        message: "Header 'time-zone' is required",
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return timeZone;
  },
);
export const BranchId = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const branchId = request.header("branch-id");
    if (!branchId) {
      throw new CustomException({
        message: "Header 'branch-id' is required",
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return branchId;
  },
);

export const Language = createParamDecorator(
  (_, ctx: ExecutionContext): Locale => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return getUserLocaleFromRequest(request);
  },
);

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserWithBranchesIds;
  },
);

export const getUserLocaleFromRequest = (req: Request): Locale => {
  const defaultLanguage = "ar";
  const locale: string = req.headers["accept-language"] || defaultLanguage;
  return locale.includes("en") ? "en" : "ar";
};
