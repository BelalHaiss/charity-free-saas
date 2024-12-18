import {
  createParamDecorator,
  ExecutionContext,
  HttpStatus,
} from "@nestjs/common";
import { Request } from "express";
import { CustomException } from "../shared/exception/CustomException";
import { Locale } from "@shared/types/util.types";
import { JWT_PAYLOAD } from "../types/auth.types";

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

export const BranchID = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const branchId = Number(request.header("branch-id"));

    if (!branchId || isNaN(branchId)) {
      throw new CustomException({
        message: "Header 'branch-id' is required",
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return branchId;
  },
);

export const Language = createParamDecorator(
  (defaultLanguage: string = "en", ctx: ExecutionContext): Locale => {
    const request = ctx.switchToHttp().getRequest();
    const locale: string =
      request.headers["accept-language"] || defaultLanguage;
    return locale.includes("en") ? "en" : "ar";
  },
);

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JWT_PAYLOAD;
  },
);
