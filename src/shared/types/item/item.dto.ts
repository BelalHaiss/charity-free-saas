import { Prisma } from "@prisma/client";

export type ItemDTO = Prisma.ItemGetPayload<{
  include: {
    unit: true;
  };
}>;
