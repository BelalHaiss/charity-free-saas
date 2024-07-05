import { Beneficiary, Person } from "@prisma/client";
import { ApiPaginationQueryParams } from "../util.types";

type BeneficiaryTableDtoData = Pick<
  Beneficiary,
  "created_at" | "updated_at" | "id" | "notes"
> &
  Pick<Person, "sponsorship_case_id" | "name" | "identity_card">;

export type BeneficiaryTableDTO = {
  data: BeneficiaryTableDtoData[];
  totalRecords: number;
};
type BeneficiaryTableFilteredFields = Pick<
  BeneficiaryTableDtoData,
  "name" | "identity_card" | "id"
>;

export type BeneficiaryTableQuery =
  ApiPaginationQueryParams<BeneficiaryTableFilteredFields>;
