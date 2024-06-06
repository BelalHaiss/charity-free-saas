import { CalendarProps } from 'primevue/calendar';
import { CheckboxProps } from 'primevue/checkbox';
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
  | 'checkbox';

type InputProps = MultiSelectProps | CalendarProps | CheckboxProps;
export type FormField<K extends string> = {
  label: string;
  name: K;
  type: FormFieldType;
  inputProps?: InputProps;
};

export type FormFieldProps<T extends InputProps = {}> = Omit<
  FormField<string>,
  'inputProps'
> & {
  inputProps: T extends InputProps ? T : undefined;
};
