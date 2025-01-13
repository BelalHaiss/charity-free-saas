import { QUERY_KEYS } from "@render/composables/use-query-typed";
import { TableColumns, TableFilter } from "@render/types/table.types";
import { formatDate } from "@render/utils/date.util";
import {
  BeneficiaryTableDTO,
  BeneficiaryTableDtoData,
  BeneficiaryTableQuery,
} from "@shared/types/beneficiaries/beneficiaries.dto";
import { computed, ref } from "vue";
import { Locale, useI18n } from "vue-i18n";
import { DataTableFilterEvent, DataTablePageEvent } from "primevue/datatable";
import { useRouter } from "vue-router/auto";
import { beneficiaryRepository } from "../repository/beneficiary.repository";
import { useQuery } from "@tanstack/vue-query";

export const useBeneficiaryTable = () => {
  const { t } = useI18n<object, Locale>();
  const headers = computed<TableColumns<BeneficiaryTableDtoData>[]>(() => [
    {
      field: "id",
      dataGetter: (data) => data.id,
      header: t("code"),
      fieldType: "number",
    },
    {
      field: "name",
      dataGetter: (data) => data.name,
      header: t("name", { label: t("beneficiary") }),
    },
    {
      dataGetter: (data) => data.identity_card!,
      field: "identity_card",
      header: t("identity_card"),
      fieldType: "text",
    },
    {
      dataGetter: (data) => data.sponsorship_case_id!.toString(),
      field: "sponsorship_case_id",
      header: t("type", { label: t("sponsorship") }),
      fieldType: "select",
    },
    {
      field: "created_at",
      dataGetter: (data) => formatDate(data.created_at, "d / L / y"),

      header: t("created_at"),
      fieldType: "date",
    },
    {
      dataGetter: (data) => formatDate(data.updated_at, "d / L / y"),
      header: t("updated_at"),
      field: "updated_at",
      fieldType: "date",
    },
    {
      dataGetter: (data) => data.notes?.slice(0, 30) ?? "",
      field: "notes",
      header: t("note"),
    },
  ]);
  const router = useRouter();
  const navigateToBeneficiary = (data: BeneficiaryTableDtoData) =>
    router.push("/beneficiaries/" + data.id);
  const filters = ref<TableFilter<BeneficiaryTableQuery["filter"]>>({
    id: { value: undefined, matchMode: "contains" },
    identity_card: { value: undefined, matchMode: "contains" },
    name: { value: undefined, matchMode: "contains" },
  });

  const tableQuery = ref<BeneficiaryTableQuery>({
    pagination: {
      page: 0,
      pageSize: 20,
    },
    filter: {},
  });
  const { data: apiRes, isFetching } = useQuery({
    queryKey: QUERY_KEYS.BENEFICIARY_TABLE(tableQuery),
    queryFn: () => beneficiaryRepository.getBeneficiariesTableData(tableQuery),
  });
  const onPageChanged = (e: DataTablePageEvent) => {
    tableQuery.value.pagination.page = e.page;
  };

  const onFilter = (e: DataTableFilterEvent) => {
    filters.value = e.filters;
    tableQuery.value.filter = {
      id: filters.value.id?.value,
      identity_card: filters.value.identity_card?.value,
      name: filters.value.name?.value,
    };
  };

  return {
    onFilter,
    onPageChanged,
    apiRes,
    isFetching,
    navigateToBeneficiary,
    headers,
    tableQuery,
    filters,
  };
};
