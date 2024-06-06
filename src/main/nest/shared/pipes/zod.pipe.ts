import { PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';
import { CustomException } from '../exception/CustomException';

export class ZodValidationPipe<T extends ZodType> implements PipeTransform {
  constructor(private schema: T) {}

  transform(value: T) {
    const parsedValue = this.schema.safeParse(value);
    console.log({ parsedValue: parsedValue.error, value });
    if (parsedValue.error) {
      throw new CustomException({ message: 'invalid data', status: 400 });
    }
    return parsedValue.data;
  }
}
