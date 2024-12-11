import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const Timezone = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.header("time-zone");
  },
);

export const BranchID = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return Number(request.header("branch-id"));
  },
);
