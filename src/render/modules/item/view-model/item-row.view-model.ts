import { benefitRepository } from "@render/modules/benefits/repository/benefit.repository";
import { useDynamicTableContext } from "@render/modules/dynamic-table/useDynamicTable";
import { MutableTableRow } from "@render/types/table.types";
import { ItemIncludeCategoryAndBenefit } from "@shared/types/benefit/benefit.dto";
import { ref, provide, inject, type Ref } from "vue";

type Mode = "VIEW" | "WRITE";

export interface ItemRowContext {
  mode: Ref<Mode>;
  draftItem: Ref<MutableTableRow<ItemIncludeCategoryAndBenefit>>;
  isSaving: Ref<boolean>;
  create: () => Promise<void>;
  update: () => Promise<void>;
  remove: () => Promise<void>;
  setMode: (value: Mode) => void;
  discardChanges: () => void;
}

const ITEM_ROW_SYMBOL = Symbol("ItemRow");

export const useItemRow = (
  itemData: MutableTableRow<ItemIncludeCategoryAndBenefit>,
) => {
  const mode = ref<Mode>("VIEW");
  const draftItem = ref(structuredClone(itemData));
  const isSaving = ref(false);

  const { syncDeletedRow } = useDynamicTableContext();
  // placeholder for validation schema (use yup or zod here)
  const validationSchema = {};
  // placeholder: handles creating a new item
  const create = async () => {
    isSaving.value = true;
    try {
      // validate & call API to create
    } finally {
      isSaving.value = false;
    }
  };

  // placeholder: handles updating an existing item
  const update = async () => {
    isSaving.value = true;
    try {
      // validate & call API to update
    } finally {
      isSaving.value = false;
    }
  };

  // placeholder: handles deleting an item
  const remove = async () => {
    if (typeof draftItem.value.isNew === "undefined") {
      await benefitRepository.removeBenefitsByIds([draftItem.value.benefit_id]);
    }

    syncDeletedRow(draftItem.value.localId);
  };

  const setMode = (value: Mode) => {
    mode.value = value;
  };

  const discardChanges = () => {
    draftItem.value = structuredClone(itemData);
  };

  const context: ItemRowContext = {
    mode,
    draftItem,
    isSaving,
    create,
    update,
    remove,
    setMode,
    discardChanges,
  };

  provide(ITEM_ROW_SYMBOL, context);

  return context;
};

// Inject helper for child components (e.g., View or Edit rows)
export const useItemRowContext = (): ItemRowContext => {
  const context = inject<ItemRowContext>(ITEM_ROW_SYMBOL);
  if (!context) {
    throw new Error("useItemRowContext must be used within a provider");
  }
  return context;
};
