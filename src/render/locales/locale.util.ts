import { PrimeVueLocaleOptions } from 'primevue/config';
type CustomPrimeLocaleOptions = Pick<
  PrimeVueLocaleOptions,
  'dayNamesMin' | 'monthNamesShort' | 'monthNames'
>;
export const formErrorsMsgs = {
  shortName: 'shared.form.errors.short_field',
  date: 'shared.form.errors.date',
  minSelected: 'shared.form.errors.min_selected'
};

const primeLocaleOptions: {
  ar: CustomPrimeLocaleOptions;
  en: CustomPrimeLocaleOptions;
} = {
  ar: {
    dayNamesMin: ['ح', 'ن', 'ث', 'أ', 'خ', 'ج', 'س'],
    monthNamesShort: [
      'ينا',
      'فبرا',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر'
    ],
    monthNames: [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر'
    ]
  },
  en: {
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  }
};
export const getPrimeLocaleOption = (
  locale: 'ar' | 'en',
  key: keyof CustomPrimeLocaleOptions
) => {
  return primeLocaleOptions[locale][key];
};
