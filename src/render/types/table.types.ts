import { ColumnProps } from 'primevue/column';
import { DataTableFilterMetaData } from 'primevue/datatable';
import { SelectOptions } from './form.types';
import { InputTextProps } from 'primevue/inputtext';
import { InputNumberProps } from 'primevue/inputnumber';

export type FilterFieldType = 'text' | 'date' | 'number' | 'select';
export type TableColumns<T extends {}> = {
  field: keyof T;
  dataGetter: (data: T) => string | number;
  fieldType?: FilterFieldType;
  options?: SelectOptions[];
} & Omit<ColumnProps, 'field'>;

export type TableFilter<T, K extends keyof T = keyof T> = Partial<
  Record<K, { value: T[K] | null } & Pick<DataTableFilterMetaData, 'matchMode'>>
>;

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
