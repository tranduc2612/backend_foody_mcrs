/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import {env} from '@/configs'
import {RpcExceptionFilter} from '@nestjs/common'

import {ArgumentsHost, Catch} from '@nestjs/common'
import {RpcException} from '@nestjs/microservices'
import {Observable, throwError} from 'rxjs'
// import * as Sentry from '@sentry/node'

/**
 * Exception filter for catching RPC HTTP exceptions.
 * @class RpcHttpExceptionFilter
 * @implements {RpcExceptionFilter<RpcException>}
 */
@Catch(RpcException)
export class RpcHttpExceptionFilter
	implements RpcExceptionFilter<RpcException>
{
	/**
	 * Method to catch and handle the exception.
	 * @param {any} exception - The caught exception.
	 * @param {ArgumentsHost} host - The arguments host.
	 * @returns {Observable<any>} - An observable that throws a formatted version of the exception.
	 */
	catch(exception: any, host: ArgumentsHost): Observable<any> {
		return throwError(() => {
			const stack = exception.stack
			const formattedException = {
				...exception,
				// category: env.APP.LOG_CATEGORY,
				stack,
			}
			// if (env.APP.ENV !== 'local') {
			// 	Sentry.captureException(formattedException)
			// }
			return formattedException
		})
	}
}
