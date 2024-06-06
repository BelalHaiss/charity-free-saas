import { HttpException, HttpStatus } from '@nestjs/common';
import { ErroObjectArgs, ErrorObject } from './error-body.type';

export class CustomException extends HttpException implements ErrorObject {
  timestamp: number;
  statusCode: HttpStatus;
  errorType: string;
  message: string;
  constructor(errorBody: ErroObjectArgs & { status: HttpStatus }) {
    const resBody: ErrorObject = {
      timestamp: Date.now(),
      statusCode: errorBody.status,
      errorType: errorBody.errorType ?? 'error',
      message: errorBody.message
    };
    super(resBody, resBody.statusCode);

    Object.assign(this, resBody);
  }
}
