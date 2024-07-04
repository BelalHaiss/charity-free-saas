import { Beneficiary, Person } from "@prisma/client";
import { ApiPaginationQueryParams, ApiQueryParams } from "../util.types";

export type BeneficiaryTableDTO = Pick<
  Beneficiary,
  "created_at" | "updated_at" | "id" | "notes"
> &
  Pick<Person, "sponsorship_case_id" | "name" | "identity_card">;

type BeneficiaryTableFilteredFields = Pick<
  BeneficiaryTableDTO,
  "name" | "identity_card" | "id"
>;

export type BeneficiaryTableQuery =
  ApiPaginationQueryParams<BeneficiaryTableFilteredFields>;
