import { CalendarProps } from 'primevue/calendar';
import { CheckboxProps } from 'primevue/checkbox';
import { DropdownProps } from 'primevue/dropdown';
import { InputTextProps } from 'primevue/inputtext';
import { MultiSelectProps } from 'primevue/multiselect';

export type SelectOptions<T extends string | number = string | number> = {
  label: string;
  value: T;
};

export type CreatableSelectOptions<
  T extends string | number = string | number
> = {
  label: string;
  value: T;
  isCreated?: boolean;
};

export type FormFieldType =
  | 'text'
  | 'date'
  | 'multi-select-creatable'
  | 'number'
  | 'password'
  | 'checkbox'
  | 'textArea'
  | 'select-number';

export type FormFieldValueTypeMap = {
  text: string;
  number: number;
  password: string;
  date: Date;
  checkbox: boolean;
  textArea: string;
  'multi-select-creatable': CreatableSelectOptions[];
  'select-number': number;
};

type InputProps =
  | MultiSelectProps
  | CalendarProps
  | CheckboxProps
  | InputTextProps
  | DropdownProps;
export type FormField<K extends string> = {
  label: string;
  name: K;
  type: FormFieldType;
  inputProps?: InputProps;
  hideLabel?: boolean;
};

export type FormFieldProps<T extends InputProps = object> = Omit<
  FormField<string>,
  'inputProps'
> & {
  inputProps: T extends InputProps ? T : undefined;
  invalid?: boolean;
};

export type CustomFormField<K extends string> = FormField<K> & {
  valueType;
};
