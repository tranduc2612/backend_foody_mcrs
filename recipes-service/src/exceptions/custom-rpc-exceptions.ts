import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

export class RpcBadRequestException extends RpcException {
    statusCode = HttpStatus.BAD_REQUEST
    status = HttpStatus.BAD_REQUEST
  
    constructor(message: string) {
      super({
        message,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
}

export class RpcUnAuthorizeException extends RpcException {
	statusCode = HttpStatus.UNAUTHORIZED
	status = HttpStatus.UNAUTHORIZED

    constructor(message: string) {
        super({
          message,
          statusCode: HttpStatus.UNAUTHORIZED,
        });
    }
}