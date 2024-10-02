import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ErrorType, ResponseType } from "lib";

export class RpcBadRequestException extends RpcException {
    statusCode = HttpStatus.BAD_REQUEST
    status = HttpStatus.BAD_REQUEST
  
    constructor(message: string, error?: ErrorType[]) {
      const res: ResponseType = {
        message,
        statusCode: HttpStatus.BAD_REQUEST,
      }
      if(error){
        res.error = error
      }
      super(res);
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