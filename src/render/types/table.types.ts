import { ColumnProps } from "primevue/column";
import { DataTableFilterMetaData } from "primevue/datatable";
import { SelectOptions } from "./form.types";
import { InputTextProps } from "primevue/inputtext";
import { InputNumberProps } from "primevue/inputnumber";
import { Primitive } from "zod";

export type FilterFieldType = "text" | "date" | "number" | "select";
export type TableColumns<T extends object> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  field: keyof T | (string & {}); // Add a branded `string` type
  dataGetter: (data: T) => Primitive;
  fieldType?: FilterFieldType;
  options?: SelectOptions[];
} & Omit<ColumnProps, "field">;

export type TableFilter<T extends object> = {
  [P in keyof T]?: { value: T[P] } & Pick<DataTableFilterMetaData, "matchMode">;
};

export type FilterInputProps = InputTextProps | InputNumberProps;
export type FilterFieldInputType<K extends string = string> = {
  name: K;
  type: FilterFieldType;
  inputProps?: FilterInputProps;
};

export type FilterFieldInputProps<P extends FilterInputProps> = {
  name: string;
  type: FilterFieldType;
  inputProps?: P;
};
