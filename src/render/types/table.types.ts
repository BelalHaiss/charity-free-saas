import { ColumnProps } from "primevue/column";
import { DataTableFilterMetaData } from "primevue/datatable";
import { SelectOptions } from "./form.types";
import { InputTextProps } from "primevue/inputtext";
import { InputNumberProps } from "primevue/inputnumber";
import { Primitive } from "zod";
import { Component } from "vue";
import { Identifiable } from "@shared/types/util.types";
export type MutableTableRow<T extends Identifiable> = T & {
  isNew?: boolean;
};
export type FilterFieldType = "text" | "date" | "number" | "select";
export type TableColumns<T extends object> = (
  | {
      bodyComponent: {
        component: Component;
        props?: (data: T) => Record<string, unknown>;
      };
      dataGetter?: never; // Ensures `dataGetter` is not present
    }
  | {
      dataGetter: (data: T) => Primitive;
      bodyComponent?: never; // Ensures `bodyComponent` is not present
    }
) & {
  // eslint-disable-next-line @typescript-eslint/ban-types
  field: keyof T | (string & {}); // Add a branded `string` type
  header: string;
  fieldType?: FilterFieldType;
  options?: SelectOptions[];
  headerComponent?: {
    component: Component;
    props?: Record<string, unknown>;
  };
} & Omit<ColumnProps, "field" | "header">;

export type TableFilter<T extends object> = {
  [P in keyof T]?: { value: T[P] } & Pick<DataTableFilterMetaData, "matchMode">;
};

export type FilterInputProps = InputTextProps | InputNumberProps;
export type FilterFieldInputProps<P extends FilterInputProps> = {
  name: string;
  type: FilterFieldType;
  inputProps?: P;
};
