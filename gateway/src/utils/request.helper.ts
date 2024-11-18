import {
  BadRequestException,
  HttpException,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export async function transformRequest<T>(
  tcpService: ClientProxy,
  tcpKey: string,
  param: any | undefined = {},
): Promise<T> {
  try {
    const tcpResponse = await tcpService.send({ cmd: tcpKey }, param || {});
    const response = await firstValueFrom(tcpResponse);
    return response as T;
  } catch (error) {
    const { statusCode, message, errors } = error;
    const response = {
      statusCode,
      message,
      errors,
    };
    throw new HttpException(response, statusCode);
  }
}

export function exceptionRequestFactory(
  validationErrors: ValidationError[] = [],
) {
  const errors = validationErrors.map((error) => ({
    field: error.property,
    errors: Object.values(error.constraints),
  }));
  const response = {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'invalid field',
    errors,
  };
  return new BadRequestException(response);
}
