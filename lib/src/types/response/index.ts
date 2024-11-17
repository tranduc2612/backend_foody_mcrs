import { ErrorType } from "../error";

export interface ResponseType {
    message: string,
    statusCode: number,
    errors?: ErrorType[]
}