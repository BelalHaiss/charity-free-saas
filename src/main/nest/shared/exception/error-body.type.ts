import { HttpStatus } from '@nestjs/common';

export interface ErrorObject {
  timestamp: number;
  statusCode: HttpStatus;
  errorType: string;
  message: string;
}
export type ErroObjectArgs = Partial<ErrorObject> &
  Pick<ErrorObject, 'message'>;
