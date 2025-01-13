import { Beneficiary, Person } from "@prisma/client";
import {
  ApiPaginationQueryParams,
  ApiPaginationQueryResponse,
} from "../util.types";

export type BeneficiaryTableDtoData = Pick<
  Beneficiary,
  "created_at" | "updated_at" | "id" | "notes"
> &
  Pick<Person, "sponsorship_case_id" | "name" | "identity_card">;

export type BeneficiaryTableDTO =
  ApiPaginationQueryResponse<BeneficiaryTableDtoData>;
type BeneficiaryTableFilteredFields = Pick<
  BeneficiaryTableDtoData,
  "name" | "identity_card" | "id"
>;

export type BeneficiaryTableQuery =
  ApiPaginationQueryParams<BeneficiaryTableFilteredFields>;
