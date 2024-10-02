import { ErrorType } from "../error";

export interface ResponseType {
    message: string,
    statusCode: number,
    error?: ErrorType[]
}