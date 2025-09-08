/* eslint-disable @typescript-eslint/no-namespace */
import { PrismaClient, UNIT_SIZE } from '@prisma/client';
import { ITXClientDenyList } from '@prisma/client/runtime/library';

type Beneficiary_Item_Details = {
  item_unit_size: UNIT_SIZE;
  item_value: number;
};

declare global {
  namespace PrismaJson {
    type BeneficiaryItemDetails = Beneficiary_Item_Details;
  }
}

export type PrismaInteractiveTransaction = Omit<
  PrismaClient,
  ITXClientDenyList
>;
